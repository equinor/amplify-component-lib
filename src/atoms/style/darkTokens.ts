import { css } from 'styled-components';

export const darkTokens = css`
  /*Dark Theme*/
  [data-theme='dark'] {
    textarea,
    input {
      color: var(--eds_text_static_icons__default);
    }

    --amplify_interactive_tutorial_active_step: rgba(154, 202, 206, 1);
    --amplify_interactive_tutorial_inactive_step: rgba(96, 125, 127, 1);
    --amplify_interactive_inner_hover: rgba(101, 133, 135, 1);

    /* Override super specific text colors to just default text color */
    --eds_heading__h1_bold_color: var(--eds_text_static_icons__default);
    --eds_input__text_monospaced_color: var(--eds_text_static_icons__default);
    --eds_input__helper_color: var(--eds_text_static_icons__default);
    --eds_table__cell_text_link_color: var(--eds_text_static_icons__default);
    --eds_navigation__drawer_active_color: var(
      --eds_text_static_icons__default
    );
    --eds_navigation__drawer_inactive_color: var(
      --eds_text_static_icons__default
    );
    --eds_navigation__breadcrumb_color: var(--eds_text_static_icons__default);
    --eds_navigation__breadcrumb_hover_color: var(
      --eds_text_static_icons__default
    );
    --eds_navigation__menu_title_hover_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_short_italic_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_short_bold_italic_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_short_bold_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_short_link_color: var(
      --eds_interactive_primary__resting
    );
    --eds_paragraph__ingress_color: var(--eds_text_static_icons__default);
    --eds_paragraph__body_long_italic_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_long_bold_color: var(
      --eds_text_static_icons__default
    );
    --eds_paragraph__body_long_bold_italic_color: var(
      --eds_text_static_icons__default
    );
    --eds_ui__tooltip_color: var(--eds_text_static_icons__default);
    --eds_ui__snackbar_color: var(--eds_text_static_icons__default);
    --eds_ui__chart_color: var(--eds_text_static_icons__default);

    --eds_clickbound_jumbo__base: 88px;
    --eds_clickbound_default__base: 48px;
    --eds_clickbound_default__input: 56px;
    --eds_clickbound_compact__standard: 32px;
    --eds_clickbound_compact__input: 44px;

    --eds_text_static_icons__default: rgba(255, 255, 255, 1);
    --eds_text__static_icons__default: rgba(255, 255, 255, 1);

    --eds_text_static_icons__secondary: rgba(222, 229, 231, 1);
    --eds_text__static_icons__secondary: rgba(222, 229, 231, 1);

    --eds_text_static_icons__tertiary: rgba(156, 166, 172, 1);
    --eds_text__static_icons__tertiary: rgba(156, 166, 172, 1);

    --eds_text_static_icons__primary_white: rgba(61, 61, 61, 1);
    --eds_text__static_icons__primary_white: rgba(61, 61, 61, 1);

    --eds_ui_background__default: rgba(19, 38, 52, 1);
    --eds_ui_background__semitransparent: rgba(255, 255, 255, 0.2);
    --eds_ui_background__light: rgba(38, 55, 68, 1);
    --amplify_ui_background_light_medium: rgba(40, 58, 72, 1);
    --amplify_ui_background_heavy: rgba(50, 72, 89, 1);
    --amplify_ui_background_tutorial_card: rgba(50, 72, 89, 1);
    --eds_ui_background__scrim: rgba(0, 0, 0, 0.4);
    --eds_ui_background__overlay: rgba(0, 0, 0, 0.8);
    --eds_ui_background__medium: rgba(44, 64, 79, 1);
    --eds_ui_background__info: rgba(43, 126, 166, 1);
    --eds_ui_background__warning: rgba(157, 105, 63, 1);
    --eds_ui_background__danger: rgba(183, 87, 87, 1);
    --eds_infographic_substitute__purple_berry: rgba(140, 17, 89, 1);
    --eds_infographic_substitute__pink_rose: rgba(226, 73, 115, 1);
    --eds_infographic_substitute__pink_salmon: rgba(255, 146, 168, 1);
    --eds_infographic_substitute__green_cucumber: rgba(0, 95, 87, 1);
    --eds_infographic_substitute__green_succulent: rgba(0, 151, 123, 1);
    --eds_infographic_substitute__green_mint: rgba(64, 211, 143, 1);
    --eds_infographic_substitute__blue_ocean: rgba(0, 64, 136, 1);
    --eds_infographic_substitute__blue_overcast: rgba(0, 132, 196, 1);
    --eds_infographic_substitute__blue_sky: rgba(82, 192, 255, 1);
    --eds_infographic_primary__moss_green_100: rgba(0, 112, 121, 1);
    --eds_infographic_primary__moss_green_55: rgba(115, 177, 181, 1);
    --eds_infographic_primary__moss_green_34: rgba(168, 206, 209, 1);
    --eds_infographic_primary__moss_green_21: rgba(201, 224, 226, 1);
    --eds_infographic_primary__moss_green_13: rgba(222, 237, 238, 1);
    --eds_infographic_primary__energy_red_100: rgba(235, 0, 55, 1);
    --eds_infographic_primary__energy_red_55: rgba(255, 125, 152, 1);
    --eds_infographic_primary__energy_red_34: rgba(255, 174, 191, 1);
    --eds_infographic_primary__energy_red_21: rgba(255, 205, 215, 1);
    --eds_infographic_primary__energy_red_13: rgba(255, 224, 231, 1);
    --eds_infographic_primary__weathered_red: rgba(125, 0, 35, 1);
    --eds_infographic_primary__slate_blue: rgba(36, 55, 70, 1);
    --eds_infographic_primary__spruce_wood: rgba(255, 231, 214, 1);
    --eds_infographic_primary__mist_blue: rgba(213, 234, 244, 1);
    --eds_infographic_primary__lichen_green: rgba(230, 250, 236, 1);
    --eds_logo_fill_positive: rgba(235, 0, 55, 1);
    --eds_logo_fill_negative: rgba(255, 255, 255, 1);
    --eds_interactive_primary__selected_highlight: rgba(0, 151, 123, 1);
    --eds_interactive_primary__selected_hover: rgba(0, 95, 87, 1);
    --eds_interactive_primary__resting: rgba(151, 202, 206, 1);
    --eds_interactive_primary__hover: rgba(173, 226, 230, 1);
    --eds_interactive_primary__hover_alt: rgb(96, 125, 127);
    --amplify_interactive_primary_pressed: rgba(95, 198, 206, 1);
    --eds_interactive_secondary__highlight: rgba(255, 255, 255, 0.1);
    --eds_interactive_secondary__resting: rgba(222, 229, 231, 1);
    --eds_interactive_secondary__link_hover: rgba(23, 36, 47, 1);
    --eds_interactive_danger__highlight: rgba(90, 57, 70, 1);
    --eds_interactive_danger__resting: rgba(255, 115, 124, 1);
    --eds_interactive_danger__hover: rgba(255, 148, 155, 1);
    --eds_interactive_danger__text: rgba(255, 171, 176, 1);
    --eds_interactive_warning__highlight: rgba(90, 86, 73, 1);
    --eds_interactive_warning__resting: rgba(255, 146, 0, 1);
    --eds_interactive_warning__hover: rgba(255, 218, 168, 1);
    --eds_interactive_warning__text: rgba(255, 198, 122, 1);
    --eds_interactive_success__highlight: rgba(62, 92, 84, 1);
    --eds_interactive_success__resting: rgba(75, 183, 72, 1);
    --eds_interactive_success__hover: rgba(193, 231, 193, 1);
    --eds_interactive_success__text: rgba(161, 218, 160, 1);

    --eds_interactive_table__header__fill_activated: rgba(46, 63, 77, 1);
    --eds_interactive_table__header__fill_resting: rgba(36, 55, 70, 1);
    --eds_interactive_table__header__fill_hover: rgba(50, 77, 98, 1);
    --eds_interactive_table__cell__fill_activated: rgba(36, 55, 70, 1);
    --eds_interactive_table__cell__fill_resting: rgba(19, 38, 52, 1);
    --eds_interactive_table__cell__fill_hover: rgba(30, 60, 82, 1);

    --eds_interactive_disabled__text: rgba(99, 117, 131, 1);
    --eds_interactive__disabled__text: rgba(99, 117, 131, 1);

    --eds_interactive_disabled__border: rgba(64, 84, 98, 1);
    --eds_interactive__disabled__border: rgba(64, 84, 98, 1);

    --eds_interactive_disabled__fill: rgba(52, 68, 80, 1);
    --eds_interactive__disabled__fill: rgba(52, 68, 80, 1);

    --eds_interactive_text_highlight: rgba(213, 234, 244, 1);
    --eds_interactive__text_highlight: rgba(213, 234, 244, 1);

    --eds_interactive_focus: rgba(0, 112, 121, 1);

    --eds_interactive_link_on_interactive_colors: var(
      --eds_text_static_icons__default
    );
    --eds_interactive_icon_on_interactive_colors: var(
      --eds_text_static_icons__default
    );
    --eds_interactive_link_in_snackbars: rgba(151, 202, 206, 1);
    --eds_interactive_pressed_overlay_dark: rgba(0, 0, 0, 0.2);
    --eds_interactive_pressed_overlay_light: rgba(255, 255, 255, 0.2);

    --eds_elevation_raised:
      0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12),
      0 2px 4px rgba(0, 0, 0, 0.14);
    --eds_elevation_none: 0 0 1px rgba(0, 0, 0, 0.14);
    --eds_elevation_overlay:
      0 1px 10px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.12),
      0 2px 4px rgba(0, 0, 0, 0.14);
    --eds_elevation_sticky:
      0 4px 5px rgba(0, 0, 0, 0.2), 0 3px 14px rgba(0, 0, 0, 0.12),
      0 8px 10px rgba(0, 0, 0, 0.14);
    --eds_elevation_temporary_nav:
      0 7px 8px rgba(0, 0, 0, 0.2), 0 5px 22px rgba(0, 0, 0, 0.12),
      0 12px 17px rgba(0, 0, 0, 0.14);
    --eds_elevation_above_scrim:
      0 11px 15px rgba(0, 0, 0, 0.2), 0 9px 46px rgba(0, 0, 0, 0.12),
      0 24px 38px rgba(0, 0, 0, 0.14);

    --eds_heading__h1_color: var(--eds_text_static_icons__default);
    --eds_heading__h2_color: var(--eds_text_static_icons__default);
    --eds_heading__h3_color: var(--eds_text_static_icons__default);
    --eds_heading__h4_color: var(--eds_text_static_icons__default);
    --eds_heading__h5_color: var(--eds_text_static_icons__default);
    --eds_heading__h6_color: var(--eds_text_static_icons__default);

    --eds_navigation__label_color: var(--eds_text_static_icons__default);
    --eds_navigation__button_color: var(--eds_text_static_icons__default);
    --eds_input__label_color: var(--eds_text_static_icons__default);
    --eds_input__text_color: var(--eds_text_static_icons__default);

    --eds_table__cell_header_color: var(--eds_text_static_icons__default);
    --eds_table__cell_text_color: var(--eds_text_static_icons__default);
    --eds_table__cell_text_bold_color: var(--eds_text_static_icons__default);
    --eds_table__cell_numeric_monospaced_color: var(
      --eds_text_static_icons__default
    );

    --eds_navigation__menu_title_color: var(--eds_text_static_icons__default);
    --eds_navigation__menu_tabs_color: rgba(156, 166, 172, 1);
    --eds_ui__accordion_header_color: var(--eds_text_static_icons__default);

    --eds_paragraph__overline_color: var(--eds_text_static_icons__default);
    --eds_paragraph__caption_color: var(--eds_text_static_icons__default);
    --eds_paragraph__body_short_color: var(--eds_text_static_icons__default);
    --eds_paragraph__body_long_color: var(--eds_text_static_icons__default);
    --eds_paragraph__meta_color: var(--eds_text_static_icons__default);
    --eds_paragraph__body_long_link_color: var(
      --eds_text_static_icons__default
    );

    --eds_interactive__icon_on_interactive_colors: var(
      --eds_text_static_icons__default
    );

    --eds_ui__chip__badge_color: var(--eds_text_static_icons__default);

    --amplify_dataviz_primary_lighter: rgba(0, 83, 178, 1);
    --amplify_dataviz_primary_muted: rgba(0, 107, 229, 1);
    --amplify_dataviz_primary_primary: rgba(74, 149, 236, 1);
    --amplify_dataviz_primary_darker: rgba(206, 229, 255, 1);

    --amplify_dataviz_primary_90: rgba(235, 245, 255, 1);
    --amplify_dataviz_primary_80: rgba(211, 231, 253, 1);
    --amplify_dataviz_primary_70: rgba(167, 206, 251, 1);
    --amplify_dataviz_primary_60: rgba(133, 187, 250, 1);
    --amplify_dataviz_primary_50: rgba(89, 163, 248, 1);
    --amplify_dataviz_primary_40: rgba(40, 136, 246, 1);
    --amplify_dataviz_primary_30: rgba(0, 107, 229, 1);
    --amplify_dataviz_primary_20: rgba(0, 83, 178, 1);
    --amplify_dataviz_primary_10: rgba(5, 60, 122, 1);

    --amplify_dataviz_darkblue_lighter: rgba(0, 71, 153, 1);
    --amplify_dataviz_darkblue_darker: rgba(211, 238, 253, 1);
    --amplify_dataviz_darkblue_default: rgba(191, 220, 252, 1);

    --amplify_dataviz_lightblue_darker: rgba(133, 208, 250, 1);
    --amplify_dataviz_lightblue_default: rgba(35, 170, 246, 1);
    --amplify_dataviz_lightblue_lighter: rgba(4, 48, 98, 1);

    --amplify_dataviz_lightgreen_default: rgba(8, 145, 115, 1);
    --amplify_dataviz_lightgreen_darker: rgba(10, 194, 154, 1);
    --amplify_dataviz_lightgreen_lighter: rgba(0, 61, 46, 1);

    --amplify_dataviz_darkgreen_default: rgba(200, 237, 227, 1);
    --amplify_dataviz_darkgreen_darker: rgba(220, 241, 236, 1);
    --amplify_dataviz_darkgreen_lighter: rgba(0, 102, 76, 1);

    --amplify_dataviz_darkpink_default: rgba(242, 129, 176, 1);
    --amplify_dataviz_darkpink_darker: rgba(252, 212, 229, 1);
    --amplify_dataviz_darkpink_muted: rgba(169, 30, 88, 1);
    --amplify_dataviz_darkpink_lighter: rgba(135, 18, 67, 1);

    --amplify_dataviz_lightpink_default: rgba(225, 81, 93, 1);
    --amplify_dataviz_lightpink_deep: rgba(255, 219, 222, 1);
    --amplify_dataviz_lightpink_darker: rgba(225, 128, 138, 1);
    --amplify_dataviz_lightpink_lighter: rgba(143, 23, 33, 1);

    --amplify_dataviz_darkyellow_default: rgba(253, 202, 53, 1);
    --amplify_dataviz_darkyellow_darker: rgba(244, 226, 195, 1);
    --amplify_dataviz_darkyellow_lighter: rgba(121, 85, 21, 1);
    --amplify_dataviz_darkyellow_deep: rgba(255, 240, 194, 1);

    --amplify_dataviz_lightyellow_default: rgba(160, 112, 28, 1);
    --amplify_dataviz_lightyellow_darker: rgba(200, 150, 0, 1);
    --amplify_dataviz_lightyellow_lighter: rgba(98, 77, 42, 1);
    --amplify_dataviz_lightyellow_deep: rgba(227, 171, 2, 1);

    --amplify_dataviz_orange_lighter: rgba(121, 61, 21, 1);
    --amplify_dataviz_orange_default: rgba(227, 128, 36, 1);
    --amplify_dataviz_orange_muted: rgba(255, 173, 99, 1);
    --amplify_dataviz_orange_darker: rgba(255, 222, 198, 1);

    --amplify_dataviz_darkpurple_default: rgba(232, 209, 246, 1);
    --amplify_dataviz_darkpurple_darker: rgba(234, 224, 255, 1);
    --amplify_dataviz_darkpurple_lighter: rgba(147, 20, 219, 1);

    --amplify_dataviz_lightpurple_default: rgba(155, 89, 242, 1);
    --amplify_dataviz_lightpurple_darker: rgba(186, 153, 255, 1);
    --amplify_dataviz_lightpurple_lighter: rgba(97, 1, 152, 1);

    --amplify_dataviz_darkgray_lighter: rgba(69, 69, 69, 1);
    --amplify_dataviz_darkgray_default: rgba(86, 86, 86, 1);
    --amplify_dataviz_darkgray_darker: rgba(122, 122, 122, 1);
    --amplify-dataviz_darkgray_deep: rgba(173, 173, 173, 1);

    --amplify_dataviz_lightgray_pale: rgba(97, 102, 108, 1);
    --amplify_dataviz_lightgray_lighter: rgba(144, 155, 162, 1);
    --amplify_dataviz_lightgray_default: rgba(194, 200, 204, 1);
    --amplify_dataviz_lightgray_darker: rgba(235, 238, 240, 1);
  }
`;
