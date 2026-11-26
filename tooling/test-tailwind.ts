import { compile } from '@tailwindcss/node';

import { darkTokens } from 'src/atoms/style/darkTokens';
import { lightTokens } from 'src/atoms/style/lightTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';
import { TAILWIND_MAPPINGS } from 'src/atoms/style/tailwind/registry';

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  symlink,
} from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = await realpath(await mkdtemp(join(tmpdir(), 'acl-tailwind-')));
const packageName = '@equinor/amplify-component-lib';

try {
  execFileSync(
    'bun',
    [
      'pm',
      'pack',
      '--filename',
      join(fixture, 'acl.tgz'),
      '--ignore-scripts',
      '--quiet',
    ],
    { cwd: root }
  );
  const packageDir = join(fixture, 'node_modules', packageName);
  await mkdir(packageDir, { recursive: true });
  execFileSync('tar', [
    '-xzf',
    join(fixture, 'acl.tgz'),
    '-C',
    packageDir,
    '--strip-components=1',
  ]);
  await symlink(
    dirname(fileURLToPath(import.meta.resolve('tailwindcss/package.json'))),
    join(fixture, 'node_modules/tailwindcss'),
    'dir'
  );

  const require = createRequire(join(fixture, 'package.json'));
  assert.equal(require.resolve(packageName), join(packageDir, 'dist/index.js'));
  await access(join(packageDir, 'dist/index.d.ts'));
  await access(
    require.resolve(`${packageName}/dist/atoms/style/lightTokens.js`)
  );
  const manifest = JSON.parse(
    await readFile(require.resolve(`${packageName}/package.json`), 'utf8')
  );
  assert.deepEqual(manifest.sideEffects, ['**/*.css']);
  for (const path of ['tailwind.css', 'tailwind/theme.css', 'tokens.css']) {
    await access(require.resolve(`${packageName}/${path}`));
  }

  const candidates = [
    ...TAILWIND_MAPPINGS.map(([name]) =>
      name.startsWith('--color-')
        ? `bg-${name.slice(8)}`
        : `p-${name.slice(10)}`
    ),
    'text-text-static_icons__default',
    'dark:underline',
    'bg-red-500',
    'p-4',
    'p-0',
    'rounded',
  ];
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.emulateMedia({ colorScheme: 'dark' });
    for (const entry of ['tailwind.css', 'tailwind/theme.css']) {
      const compiler = await compile(
        `@import 'tailwindcss';\n@import '${packageName}/${entry}';`,
        { base: fixture, onDependency: () => {} }
      );
      const css = compiler.build(candidates);
      for (const candidate of candidates.filter(
        (name) => !name.includes(':')
      )) {
        assert.ok(
          css.includes(`.${candidate}`),
          `Missing utility: ${candidate}`
        );
      }
      const existingGlobals =
        entry === 'tailwind/theme.css'
          ? lightTokens.join('') + darkTokens.join('') + spacingTokens.join('')
          : '';
      await page.setContent(`<style>${css}</style>
        <div id="sample" class="bg-ui-background__default text-text-static_icons__default p-medium rounded"></div>
        <div id="variant" class="dark:underline">Theme variant</div>
        <div data-theme="dark" data-spacings-mode="compact">
          <div id="nested-dark" class="bg-ui-background__default p-medium"></div>
          <div data-theme="light" data-spacings-mode="comfortable">
            <div id="nested-light" class="bg-ui-background__default p-medium"></div>
          </div>
        </div>
        <div id="legacy" class="bg-dataviz-primary-g10"></div>
        <div id="current" class="bg-dataviz-primary-10"></div>
        <div id="primary" class="bg-dataviz-primary-default"></div>
        <div id="focus" class="bg-interactive-focus"></div>
        <div id="logo" class="bg-logo-fill_positive"></div>`);
      if (existingGlobals) await page.addStyleTag({ content: existingGlobals });

      const style = (id: string, property: string) =>
        page
          .locator(`#${id}`)
          .evaluate(
            (element, prop) => getComputedStyle(element).getPropertyValue(prop),
            property
          );

      // No provider or theme attribute is needed for the combined entry point.
      if (entry === 'tailwind.css') {
        assert.equal(
          await style('sample', 'background-color'),
          'rgb(255, 255, 255)'
        );
        assert.equal(await style('variant', 'text-decoration-line'), 'none');
      }
      for (const theme of ['light', 'dark']) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
        }, theme);
        assert.equal(
          await style('sample', 'background-color'),
          theme === 'dark' ? 'rgb(19, 38, 52)' : 'rgb(255, 255, 255)'
        );
        assert.equal(
          await style('sample', 'color'),
          theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(61, 61, 61)'
        );
        assert.equal(
          await style('variant', 'text-decoration-line'),
          theme === 'dark' ? 'underline' : 'none'
        );
        assert.equal(
          await style('primary', 'background-color'),
          theme === 'dark' ? 'rgb(74, 149, 236)' : 'rgb(0, 107, 229)'
        );
        assert.equal(
          await style('focus', 'background-color'),
          'rgb(0, 112, 121)'
        );
        assert.equal(
          await style('logo', 'background-color'),
          'rgb(235, 0, 55)'
        );
        assert.equal(
          await style('legacy', 'background-color'),
          await style('current', 'background-color')
        );
        for (const [density, padding] of [
          ['comfortable', '16px'],
          ['compact', '12px'],
          ['extra-compact', '8px'],
        ]) {
          await page.evaluate((value) => {
            document.documentElement.dataset.spacingsMode = value;
          }, density);
          assert.equal(await style('sample', 'padding-top'), padding);
          const unresolved = await page
            .locator('#sample')
            .evaluate((element, mappings) => {
              const styles = getComputedStyle(element);
              return mappings
                .filter(([utility, source]) => {
                  const value = styles.getPropertyValue(source).trim();
                  return (
                    !value ||
                    !CSS.supports(
                      utility.startsWith('--color-') ? 'color' : 'padding',
                      value
                    )
                  );
                })
                .map(([, source]) => source);
            }, TAILWIND_MAPPINGS);
          assert.deepEqual(
            unresolved,
            [],
            `Unresolved tokens in ${entry}, ${theme}/${density}`
          );
          assert.equal(
            await style('nested-dark', 'background-color'),
            'rgb(19, 38, 52)'
          );
          assert.equal(await style('nested-dark', 'padding-top'), '12px');
          assert.equal(
            await style('nested-light', 'background-color'),
            'rgb(255, 255, 255)'
          );
          assert.equal(await style('nested-light', 'padding-top'), '16px');
        }
      }
      assert.equal(await style('sample', 'border-top-left-radius'), '4px');
      await page.addStyleTag({
        content:
          '[data-theme="dark"] { --eds_ui_background__default: rgb(1, 2, 3); }',
      });
      assert.equal(await style('sample', 'background-color'), 'rgb(1, 2, 3)');
    }
    const raw = await readFile(
      require.resolve(`${packageName}/tokens.css`),
      'utf8'
    );
    assert.ok(!raw.includes('@theme'));
    await page.setContent(
      `<style>${raw}</style><div style="background:var(--eds_ui_background__default);padding:var(--eds_spacing_medium)" id="raw"></div>`
    );
    assert.equal(
      await page
        .locator('#raw')
        .evaluate((element) => getComputedStyle(element).paddingTop),
      '16px'
    );
  } finally {
    await browser.close();
  }
  console.log(
    'Packed CSS imports, Tailwind utilities, light/dark themes and density scopes passed.'
  );
} finally {
  await rm(fixture, { recursive: true, force: true });
}
