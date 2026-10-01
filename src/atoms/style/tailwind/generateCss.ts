import { INTERNAL_TOKENS, TAILWIND_MAPPINGS, TOKEN_ALIASES } from './registry';

import postcss from 'postcss';

type Tokens = Map<string, string>;
export interface TokenSources {
  light: string;
  dark: string;
  spacing: string;
}

function readTokens(css: string, selector: string): Tokens {
  const root = postcss.parse(css);
  const tokens: Tokens = new Map();
  root.walkRules((rule) => {
    if (!rule.selectors.includes(selector)) return;
    for (const node of rule.nodes) {
      if (node.type === 'decl' && node.prop.startsWith('--')) {
        tokens.set(node.prop, node.value);
      }
    }
  });
  if (!tokens.size) throw new Error(`No tokens found for ${selector}`);
  return tokens;
}

function addAliases(tokens: Tokens): Tokens {
  const aliases: Tokens = new Map();
  for (const [canonical, legacy] of TOKEN_ALIASES) {
    if (!tokens.has(canonical) && tokens.has(legacy)) {
      aliases.set(canonical, `var(${legacy})`);
    }
    if (!tokens.has(legacy) && tokens.has(canonical)) {
      aliases.set(legacy, `var(${canonical})`);
    }
  }
  for (const [name, value] of aliases) tokens.set(name, value);
  return aliases;
}

function rule(selector: string, tokens: Tokens): string {
  return `${selector} {\n${[...tokens]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `  ${name}: ${value.replace(/\s+/g, ' ')};`)
    .join('\n')}\n}\n`;
}

function validateReferences(tokens: Tokens, scope: string) {
  const resolved = new Set<string>();
  function visit(name: string, path: Set<string>) {
    if (resolved.has(name)) return;
    if (path.has(name))
      throw new Error(`Circular token reference in ${scope}: ${name}`);
    const value = tokens.get(name);
    if (value === undefined)
      throw new Error(`Missing token in ${scope}: ${name}`);
    const next = new Set(path).add(name);
    for (const [, reference] of value.matchAll(/var\(\s*(--[\w-]+)/g)) {
      visit(reference, next);
    }
    resolved.add(name);
  }
  for (const name of tokens.keys()) visit(name, new Set());
}

export function generateCss(sources: TokenSources) {
  const light = readTokens(sources.light, "[data-theme='light']");
  const dark = readTokens(sources.dark, "[data-theme='dark']");
  const comfortable = readTokens(sources.spacing, 'html');
  const compact = readTokens(sources.spacing, "[data-spacings-mode='compact']");
  const extraCompact = readTokens(
    sources.spacing,
    "[data-spacings-mode='extra-compact']"
  );
  const originalTokens = new Set([
    ...light.keys(),
    ...dark.keys(),
    ...comfortable.keys(),
    ...compact.keys(),
    ...extraCompact.keys(),
  ]);
  const lightAliases = addAliases(light);
  const darkAliases = addAliases(dark);
  const mapped = new Set(TAILWIND_MAPPINGS.map(([, source]) => source));
  const classified = new Set([
    ...mapped,
    ...TOKEN_ALIASES.flat(),
    ...INTERNAL_TOKENS,
  ]);
  const missing = [...originalTokens].filter((name) => !classified.has(name));
  if (missing.length)
    throw new Error(`Unclassified tokens: ${missing.sort().join(', ')}`);

  for (const [themeName, theme] of [
    ['light', light],
    ['dark', dark],
  ] as const) {
    for (const [density, spacing] of [
      ['comfortable', comfortable],
      ['compact', compact],
      ['extra-compact', extraCompact],
    ] as const) {
      const tokens = new Map([...theme, ...comfortable, ...spacing]);
      for (const name of mapped) {
        if (!tokens.has(name))
          throw new Error(
            `Missing mapped token in ${themeName}/${density}: ${name}`
          );
      }
      validateReferences(tokens, `${themeName}/${density}`);
    }
  }
  const utilities = new Map(TAILWIND_MAPPINGS);
  if (utilities.size !== TAILWIND_MAPPINGS.length)
    throw new Error('Duplicate Tailwind utility name');
  const declarations = new Map(
    [...utilities].map(([name, source]) => [name, `var(${source})`])
  );
  declarations.set('--spacing-0', '0px');
  declarations.set('--radius', '4px');

  const tokensCss = [
    rule(":root, [data-theme='light']", light),
    rule("[data-theme='dark']", dark),
    rule(':root, [data-spacings-mode="comfortable"]', comfortable),
    rule("[data-spacings-mode='compact']", compact),
    rule("[data-spacings-mode='extra-compact']", extraCompact),
  ].join('\n');
  const themeCss = [
    rule(":root:not([data-theme='dark']), [data-theme='light']", lightAliases),
    rule("[data-theme='dark']", darkAliases),
    rule('@theme inline', declarations),
    "@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));\n",
  ].join('\n');
  return { tokensCss, themeCss };
}
