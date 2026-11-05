import { generateCss, TokenSources } from './generateCss';
import { TAILWIND_MAPPINGS } from './registry';
import { darkTokens } from 'src/atoms/style/darkTokens';
import { lightTokens } from 'src/atoms/style/lightTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';

import postcss from 'postcss';

const { duplicateMappings } = vi.hoisted(() => ({
  duplicateMappings: [] as [string, string][],
}));
vi.mock('./registry', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./registry')>();
  return {
    ...actual,
    get TAILWIND_MAPPINGS() {
      return [...actual.TAILWIND_MAPPINGS, ...duplicateMappings];
    },
  };
});

const sources: TokenSources = {
  light: lightTokens.join(''),
  dark: darkTokens.join(''),
  spacing: spacingTokens.join(''),
};

afterEach(() => {
  duplicateMappings.length = 0;
});

test('generates deterministic, declaration-only runtime CSS and inline utilities', () => {
  const result = generateCss(sources);
  expect(generateCss(sources)).toEqual(result);
  const runtime = postcss.parse(result.tokensCss);
  expect(runtime.nodes).toHaveLength(5);
  runtime.walkRules((rule) => {
    expect(rule.nodes.every((node) => node.type === 'decl')).toBe(true);
  });
  expect(result.tokensCss).not.toContain('textarea');
  expect(result.tokensCss).not.toContain('@theme');
  expect(result.tokensCss).toContain(":root, [data-theme='light']");
  expect(result.tokensCss).toContain('[data-spacings-mode="comfortable"]');
  expect(result.themeCss).toContain('@theme inline');
  expect(result.themeCss).toContain('@custom-variant dark');
  expect(result.themeCss).not.toContain('--color-*: initial');
  expect(result.themeCss).not.toContain('--spacing-*: initial');
  expect(result.themeCss).not.toContain('rgba(');
});

test('publishes every reviewed mapping, including corrected legacy utilities', () => {
  const { themeCss } = generateCss(sources);
  for (const [utility, source] of TAILWIND_MAPPINGS) {
    expect(themeCss).toContain(`${utility}: var(${source});`);
  }
  expect(themeCss).toContain('--spacing-x_small: var(--eds_spacing_x_small)');
  expect(themeCss).toContain(
    '--color-dataviz-primary-g10: var(--amplify_dataviz_primary_10)'
  );
  expect(themeCss).toContain(
    '--color-dataviz-darkgray-darker: var(--amplify_dataviz_darkgray_darker)'
  );
  expect(themeCss).not.toContain('--color-interactive-inner-hover');
});

test('preserves source token values in every theme and density', () => {
  const { tokensCss } = generateCss(sources);
  const runtime = postcss.parse(tokensCss);
  for (const css of Object.values(sources)) {
    postcss.parse(css).walkRules((sourceRule) => {
      const selector = sourceRule.selectors.includes('html')
        ? ':root, [data-spacings-mode="comfortable"]'
        : sourceRule.selector === "[data-theme='light']"
          ? ":root, [data-theme='light']"
          : sourceRule.selector;
      const values = new Map<string, string>();
      for (const node of sourceRule.nodes) {
        if (node.type === 'decl' && node.prop.startsWith('--')) {
          values.set(node.prop, node.value.replace(/\s+/g, ' '));
        }
      }
      if (!values.size) return;
      runtime.walkRules(selector, (output) => {
        const declarations = new Map<string, string>();
        output.walkDecls((decl) => {
          declarations.set(decl.prop, decl.value);
        });
        for (const [name, value] of values) {
          expect(declarations.get(name), `${selector}: ${name}`).toBe(value);
        }
      });
    });
  }
});

test('normalizes per-theme aliases without changing their existing source values', () => {
  const { tokensCss, themeCss } = generateCss(sources);
  const root = postcss.parse(tokensCss);
  const values = new Map<string, string>();
  root.walkRules("[data-theme='dark']", (rule) => {
    rule.walkDecls((decl) => {
      values.set(decl.prop, decl.value);
    });
  });
  expect(values.get('--amplify_dataviz_primary_default')).toBe(
    'var(--amplify_dataviz_primary_primary)'
  );
  expect(values.get('--amplify_dataviz_primary_primary')).toBe(
    'rgba(74, 149, 236, 1)'
  );
  expect(values.get('--eds_logo__fill_positive')).toBe(
    'var(--eds_logo_fill_positive)'
  );
  expect(themeCss).toContain(":root:not([data-theme='dark'])");
});

test('fails if a required source selector is missing', () => {
  expect(() => generateCss({ ...sources, light: '' })).toThrow(
    'No tokens found'
  );
});

test('fails for unclassified additions instead of silently dropping them', () => {
  expect(() =>
    generateCss({
      ...sources,
      light: `${sources.light}\n[data-theme='light'] { --amplify_new_color: red; }`,
    })
  ).toThrow('Unclassified tokens: --amplify_new_color');
});

test('fails for mapped tokens absent from a theme', () => {
  expect(() =>
    generateCss({
      ...sources,
      dark: sources.dark.replace(/--eds_ui_background__danger:[^;]+;/, ''),
    })
  ).toThrow(
    'Missing mapped token in dark/comfortable: --eds_ui_background__danger'
  );
});

test('fails for broken references and circular token aliases', () => {
  expect(() =>
    generateCss({
      ...sources,
      light: sources.light.replace(
        '--eds_text__static_icons__default);',
        '--missing_token);'
      ),
    })
  ).toThrow('Missing token in light/comfortable: --missing_token');
  expect(() =>
    generateCss({
      ...sources,
      light: sources.light.replace(
        /--eds_ui_background__default:[^;]+;/,
        '--eds_ui_background__default: var(--eds_ui_background__default);'
      ),
    })
  ).toThrow('Circular token reference');
});

test('fails on utility name collisions', () => {
  duplicateMappings.push(['--spacing-medium', '--eds_spacing_medium']);
  expect(() => generateCss(sources)).toThrow('Duplicate Tailwind utility name');
});
