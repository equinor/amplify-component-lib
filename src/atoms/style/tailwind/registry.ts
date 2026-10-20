type TokenGroup = readonly [
  utility: string,
  source: string,
  names: readonly string[],
];

const COLOR_GROUPS: TokenGroup[] = [
  [
    'text-static_icons__',
    '--eds_text__static_icons__',
    ['default', 'primary_white', 'secondary', 'tertiary'],
  ],
  [
    'ui-background__',
    '--eds_ui_background__',
    [
      'danger',
      'default',
      'info',
      'light',
      'medium',
      'overlay',
      'scrim',
      'semitransparent',
      'warning',
    ],
  ],
  [
    'ui-background__',
    '--amplify_ui_background_',
    ['heavy', 'light_medium', 'success', 'tutorial_card'],
  ],
  [
    'infographic-primary__',
    '--eds_infographic_primary__',
    [
      'energy_red_100',
      'energy_red_13',
      'energy_red_21',
      'energy_red_34',
      'energy_red_55',
      'lichen_green',
      'mist_blue',
      'moss_green_100',
      'moss_green_13',
      'moss_green_21',
      'moss_green_34',
      'moss_green_55',
      'slate_blue',
      'spruce_wood',
      'weathered_red',
    ],
  ],
  [
    'infographic-substitute__',
    '--eds_infographic_substitute__',
    [
      'blue_ocean',
      'blue_overcast',
      'blue_sky',
      'green_cucumber',
      'green_mint',
      'green_succulent',
      'pink_rose',
      'pink_salmon',
      'purple_berry',
    ],
  ],
  ['logo-', '--eds_logo__', ['fill_negative', 'fill_positive']],
  ...['danger', 'success', 'warning'].map(
    (state): TokenGroup => [
      `interactive-${state}__`,
      `--eds_interactive_${state}__`,
      ['highlight', 'hover', 'resting', 'text'],
    ]
  ),
  ...['danger', 'success', 'warning', 'primary', 'info'].map(
    (state): TokenGroup => [
      `interactive-${state}__`,
      `--amplify_interactive_${state}__`,
      state === 'primary' ? ['nested_hover'] : ['text_hover', 'nested_hover'],
    ]
  ),
  ['interactive-info__', '--amplify_interactive_info__', ['text']],
  [
    'interactive-disabled__',
    '--eds_interactive__disabled__',
    ['border', 'fill', 'text'],
  ],
  [
    'interactive-',
    '--eds_interactive__',
    [
      'focus',
      'icon_on_interactive_colors',
      'link_in_snackbars',
      'link_on_interactive_colors',
      'pressed_overlay_dark',
      'pressed_overlay_light',
      'text_highlight',
    ],
  ],
  [
    'interactive-primary__',
    '--eds_interactive_primary__',
    ['hover', 'hover_alt', 'resting', 'selected_highlight', 'selected_hover'],
  ],
  ['interactive-primary__', '--amplify_interactive_primary_', ['pressed']],
  [
    'interactive-secondary__',
    '--eds_interactive_secondary__',
    ['highlight', 'link_hover', 'resting'],
  ],
  ...['cell', 'header'].map(
    (part): TokenGroup => [
      `interactive-table__${part}__fill_`,
      `--eds_interactive_table__${part}__fill_`,
      ['activated', 'hover', 'resting'],
    ]
  ),
  [
    'interactive-tutorial__',
    '--amplify_interactive_tutorial_',
    ['active_step', 'inactive_step'],
  ],
];

const DATAVIZ: Record<string, readonly string[]> = {
  primary: [
    'default',
    'muted',
    'darker',
    'lighter',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
  ],
  darkblue: ['default', 'darker', 'lighter'],
  lightblue: ['default', 'darker', 'lighter'],
  darkgreen: ['default', 'darker', 'lighter'],
  lightgreen: ['default', 'darker', 'lighter'],
  darkpink: ['default', 'darker', 'muted', 'lighter'],
  lightpink: ['default', 'darker', 'deep', 'lighter'],
  darkyellow: ['default', 'darker', 'deep', 'lighter'],
  lightyellow: ['default', 'darker', 'deep', 'lighter'],
  orange: ['default', 'darker', 'muted', 'lighter'],
  darkpurple: ['default', 'darker', 'lighter'],
  lightpurple: ['default', 'darker', 'lighter'],
  darkgray: ['default', 'darker', 'deep', 'lighter'],
  lightgray: ['default', 'darker', 'pale', 'lighter'],
};

export const TAILWIND_MAPPINGS: readonly (readonly [string, string])[] = [
  ...COLOR_GROUPS.flatMap(([utility, source, names]) =>
    names.map(
      (name) => [`--color-${utility}${name}`, `${source}${name}`] as const
    )
  ),
  ...Object.entries(DATAVIZ).flatMap(([family, shades]) =>
    shades.map(
      (shade) =>
        [
          `--color-dataviz-${family}-${shade}`,
          `--amplify_dataviz_${family}_${shade}`,
        ] as const
    )
  ),
  ...['10', '20', '30', '40', '50', '60', '70', '80', '90'].map(
    (step) =>
      [
        `--color-dataviz-primary-g${step}`,
        `--amplify_dataviz_primary_${step}`,
      ] as const
  ),
  ...[
    'xxx_large',
    'xx_large',
    'x_large',
    'large',
    'medium',
    'medium_small',
    'small',
    'x_small',
    'xx_small',
  ].map((size) => [`--spacing-${size}`, `--eds_spacing_${size}`] as const),
];

// Preserve legacy variable spellings, including those that differ by theme.
export const TOKEN_ALIASES: readonly (readonly [string, string])[] = [
  ...['default', 'primary_white', 'secondary', 'tertiary'].map(
    (name) =>
      [
        `--eds_text__static_icons__${name}`,
        `--eds_text_static_icons__${name}`,
      ] as const
  ),
  ...['fill_positive', 'fill_negative'].map(
    (name) => [`--eds_logo__${name}`, `--eds_logo_${name}`] as const
  ),
  ...[
    'disabled__border',
    'disabled__fill',
    'disabled__text',
    'focus',
    'icon_on_interactive_colors',
    'link_in_snackbars',
    'link_on_interactive_colors',
    'pressed_overlay_dark',
    'pressed_overlay_light',
    'text_highlight',
  ].map(
    (name) =>
      [`--eds_interactive__${name}`, `--eds_interactive_${name}`] as const
  ),
  ['--amplify_dataviz_darkgray_deep', '--amplify-dataviz_darkgray_deep'],
  ['--amplify_dataviz_primary_default', '--amplify_dataviz_primary_primary'],
];

// Component-specific colors are emitted as raw tokens, not public utilities.
export const INTERNAL_TOKENS = new Set([
  '--eds_heading__h1_bold_color',
  ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(
    (name) => `--eds_heading__${name}_color`
  ),
  ...['helper', 'label', 'text', 'text_monospaced'].map(
    (name) => `--eds_input__${name}_color`
  ),
  ...[
    'breadcrumb',
    'breadcrumb_hover',
    'button',
    'drawer_active',
    'drawer_inactive',
    'label',
    'menu_tabs',
    'menu_title',
    'menu_title_hover',
  ].map((name) => `--eds_navigation__${name}_color`),
  ...[
    'body_long',
    'body_long_bold',
    'body_long_bold_italic',
    'body_long_italic',
    'body_long_link',
    'body_short',
    'body_short_bold',
    'body_short_bold_italic',
    'body_short_italic',
    'body_short_link',
    'caption',
    'ingress',
    'meta',
    'overline',
  ].map((name) => `--eds_paragraph__${name}_color`),
  ...[
    'cell_header',
    'cell_numeric_monospaced',
    'cell_text',
    'cell_text_bold',
    'cell_text_link',
  ].map((name) => `--eds_table__${name}_color`),
  ...['accordion_header', 'chip__badge', 'chart', 'snackbar', 'tooltip'].map(
    (name) => `--eds_ui__${name}_color`
  ),
  // Hit targets and elevation are not color/spacing utilities.
  ...[
    'compact__input',
    'compact__standard',
    'default__base',
    'default__input',
    'jumbo__base',
  ].map((name) => `--eds_clickbound_${name}`),
  ...[
    'above_scrim',
    'none',
    'overlay',
    'raised',
    'sticky',
    'temporary_nav',
  ].map((name) => `--eds_elevation_${name}`),
  '--eds_button__padding_x',
  '--eds_button__height',
  '--eds_icon-button__size',
]);
