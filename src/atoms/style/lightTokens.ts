import { css } from 'styled-components';

export const lightTokens = css`
  [data-theme='light'] {
    --amplify_ui_background_light_medium: rgba(235, 235, 235, 1);
    --amplify_ui_background_heavy: rgba(189, 189, 189, 1);
    --amplify_ui_background_tutorial_card: rgba(222, 237, 238, 1);

    --amplify_interactive_primary_pressed: rgba(19, 46, 49, 1);
    --amplify_interactive_tutorial_active_step: rgba(0, 112, 121, 1);
    --amplify_interactive_tutorial_inactive_step: rgba(168, 206, 209, 1);
    --amplify_interactive_inner_hover: rgba(198, 223, 225, 1);

    --amplify_dataviz_primary_default: rgba(0, 107, 229, 1);
    --amplify_dataviz_primary_darker: rgba(0, 83, 178, 1);
    --amplify_dataviz_primary_muted: rgba(74, 149, 236, 1);
    --amplify_dataviz_primary_lighter: rgba(206, 229, 255, 1);

    --amplify_dataviz_primary_10: rgba(235, 245, 255, 1);
    --amplify_dataviz_primary_20: rgba(211, 231, 253, 1);
    --amplify_dataviz_primary_30: rgba(167, 206, 251, 1);
    --amplify_dataviz_primary_40: rgba(133, 187, 250, 1);
    --amplify_dataviz_primary_50: rgba(89, 163, 248, 1);
    --amplify_dataviz_primary_60: rgba(40, 136, 246, 1);
    --amplify_dataviz_primary_70: rgba(0, 107, 229, 1);
    --amplify_dataviz_primary_80: rgba(0, 83, 178, 1);
    --amplify_dataviz_primary_90: rgba(5, 60, 122, 1);

    --amplify_dataviz_darkblue_default: rgba(0, 71, 153, 1);
    --amplify_dataviz_darkblue_darker: rgba(4, 48, 98, 1);
    --amplify_dataviz_darkblue_lighter: rgba(191, 220, 252, 1);

    --amplify_dataviz_lightblue_default: rgba(133, 208, 250, 1);
    --amplify_dataviz_lightblue_darker: rgba(35, 170, 246, 1);
    --amplify_dataviz_lightblue_lighter: rgba(211, 238, 253, 1);

    --amplify_dataviz_lightgreen_default: rgba(10, 194, 154, 1);
    --amplify_dataviz_lightgreen_darker: rgba(8, 145, 115, 1);
    --amplify_dataviz_lightgreen_lighter: rgba(220, 241, 236, 1);

    --amplify_dataviz_darkgreen_default: rgba(0, 102, 76, 1);
    --amplify_dataviz_darkgreen_darker: rgba(0, 61, 46, 1);
    --amplify_dataviz_darkgreen_lighter: rgba(200, 237, 227, 1);

    --amplify_dataviz_berry_default: rgba(169, 30, 88, 1);
    --amplify_dataviz_berry_darker: rgba(135, 18, 67, 1);
    --amplify_dataviz_berry_muted: rgba(242, 129, 179, 1);
    --amplify_dataviz_berry_lighter: rgba(252, 212, 229, 1);

    --amplify_dataviz_lightpink_default: rgba(255, 128, 138, 1);
    --amplify_dataviz_lightpink_deep: rgba(143, 23, 33, 1);
    --amplify_dataviz_lightpink_darker: rgba(225, 81, 93, 1);
    --amplify_dataviz_lightpink_lighter: rgba(255, 219, 222, 1);

    --amplify_dataviz_darkyellow_default: rgba(160, 112, 28, 1);
    --amplify_dataviz_darkyellow_darker: rgba(121, 85, 21, 1);
    --amplify_dataviz_darkyellow_lighter: rgba(244, 226, 195, 1);
    --amplify_dataviz_darkyellow_deep: rgba(98, 77, 21, 1);

    --amplify_dataviz_lightyellow_default: rgba(253, 203, 53, 1);
    --amplify_dataviz_lightyellow_darker: rgba(227, 171, 2, 1);
    --amplify_dataviz_lightyellow_lighter: rgba(255, 240, 194, 1);
    --amplify_dataviz_lightyellow_deep: rgba(200, 150, 0, 1);

    --amplify_dataviz_orange_lighter: rgba(255, 222, 198, 1);
    --amplify_dataviz_orange_default: rgba(255, 173, 99, 1);
    --amplify_dataviz_orange_muted: rgba(227, 128, 36, 1);
    --amplify_dataviz_orange_darker: rgba(121, 61, 21, 1);

    --amplify_dataviz_darkpurple_default: rgba(147, 20, 219, 1);
    --amplify_dataviz_darkpurple_darker: rgba(97, 1, 152, 1);
    --amplify_dataviz_darkpurple_lighter: rgba(232, 209, 246, 1);

    --amplify_dataviz_lightpurple_default: rgba(186, 153, 255, 1);
    --amplify_dataviz_lightpurple_darker: rgba(155, 89, 242, 1);
    --amplify_dataviz_lightpurple_lighter: rgba(234, 224, 255, 1);

    --amplify_dataviz_darkgray_default: rgba(122, 122, 122, 1);
    --amplify-dataviz_darkgray_deep: rgba(69, 69, 69, 1);
    --amplify_dataviz_darkgray_darker: rgba(86, 86, 86, 1);
    --amplify_dataviz_darkgray_lighter: rgba(173, 173, 173, 1);

    --amplify_dataviz_lightgray_default: rgba(144, 155, 162, 1);
    --amplify_dataviz_lightgray_darker: rgba(91, 102, 108, 1);
    --amplify_dataviz_lightgray_lighter: rgba(194, 200, 204, 1);
    --amplify_dataviz_lightgray_pale: rgba(235, 238, 240, 1);

    --eds_text__static_icons__default: rgba(61, 61, 61, 1);
    --eds_text__static_icons__secondary: rgba(86, 86, 86, 1);
    --eds_text__static_icons__tertiary: rgba(111, 111, 111, 1);
    --eds_text__static_icons__primary_white: rgba(255, 255, 255, 1);
    --eds_ui_background__default: rgba(255, 255, 255, 1);
    --eds_ui_background__semitransparent: rgba(255, 255, 255, 0.2);
    --eds_ui_background__light: rgba(247, 247, 247, 1);
    --eds_ui_background__scrim: rgba(0, 0, 0, 0.4);
    --eds_ui_background__overlay: rgba(0, 0, 0, 0.8);
    --eds_ui_background__medium: rgba(220, 220, 220, 1);
    --eds_ui_background__info: rgba(213, 234, 244, 1);
    --eds_ui_background__warning: rgba(255, 231, 214, 1);
    --eds_ui_background__danger: rgba(255, 193, 193, 1);
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
    --eds_logo__fill_positive: rgba(235, 0, 55, 1);
    --eds_logo__fill_negative: rgba(255, 255, 255, 1);
    --eds_interactive_primary__selected_highlight: rgba(230, 250, 236, 1);
    --eds_interactive_primary__selected_hover: rgba(195, 243, 210, 1);
    --eds_interactive_primary__resting: rgba(0, 112, 121, 1);
    --eds_interactive_primary__hover: rgba(0, 79, 85, 1);
    --eds_interactive_primary__hover_alt: rgba(222, 237, 238, 1);
    --eds_interactive_secondary__highlight: rgba(213, 234, 244, 1);
    --eds_interactive_secondary__resting: rgba(36, 55, 70, 1);
    --eds_interactive_secondary__link_hover: rgba(23, 36, 47, 1);
    --eds_interactive_danger__highlight: rgba(255, 193, 193, 1);
    --eds_interactive_danger__resting: rgba(235, 0, 0, 1);
    --eds_interactive_danger__hover: rgba(179, 13, 47, 1);
    --eds_interactive_danger__text: rgba(179, 13, 47, 1);
    --eds_interactive_warning__highlight: rgba(255, 231, 214, 1);
    --eds_interactive_warning__resting: rgba(255, 146, 0, 1);
    --eds_interactive_warning__hover: rgba(173, 98, 0, 1);
    --eds_interactive_warning__text: rgba(173, 98, 0, 1);
    --eds_interactive_success__highlight: rgba(230, 250, 236, 1);
    --eds_interactive_success__resting: rgba(75, 183, 72, 1);
    --eds_interactive_success__hover: rgba(53, 129, 50, 1);
    --eds_interactive_success__text: rgba(53, 129, 50, 1);
    --eds_interactive_table__cell__fill_resting: rgba(255, 255, 255, 1);
    --eds_interactive_table__cell__fill_hover: rgba(234, 234, 234, 1);
    --eds_interactive_table__cell__fill_activated: rgba(230, 250, 236, 1);
    --eds_interactive_table__header__fill_activated: rgba(234, 234, 234, 1);
    --eds_interactive_table__header__fill_hover: rgba(220, 220, 220, 1);
    --eds_interactive_table__header__fill_resting: rgba(247, 247, 247, 1);
    --eds_interactive__disabled__text: rgba(190, 190, 190, 1);
    --eds_interactive__text_highlight: rgba(213, 234, 244, 1);
    --eds_interactive__focus: rgba(0, 112, 121, 1);
    --eds_interactive__disabled__border: rgba(220, 220, 220, 1);
    --eds_interactive__disabled__fill: rgba(234, 234, 234, 1);
    --eds_interactive__link_on_interactive_colors: rgba(255, 255, 255, 1);
    --eds_interactive__link_in_snackbars: rgba(151, 202, 206, 1);
    --eds_interactive__pressed_overlay_dark: rgba(0, 0, 0, 0.2);
    --eds_interactive__pressed_overlay_light: rgba(255, 255, 255, 0.2);

    --eds_heading__h1_color: var(--eds_text__static_icons__default);
    --eds_heading__h2_color: var(--eds_text__static_icons__default);
    --eds_heading__h3_color: var(--eds_text__static_icons__default);
    --eds_heading__h4_color: var(--eds_text__static_icons__default);
    --eds_heading__h5_color: var(--eds_text__static_icons__default);
    --eds_heading__h6_color: var(--eds_text__static_icons__default);

    --eds_navigation__label_color: var(--eds_text__static_icons__default);
    --eds_navigation__button_color: var(--eds_text__static_icons__default);
    --eds_input__label_color: var(--eds_text__static_icons__default);
    --eds_input__text_color: var(--eds_text__static_icons__default);

    --eds_table__cell_header_color: var(--eds_text__static_icons__default);
    --eds_table__cell_text_color: var(--eds_text__static_icons__default);
    --eds_table__cell_text_bold_color: var(--eds_text__static_icons__default);
    --eds_table__cell_numeric_monospaced_color: var(
      --eds_text__static_icons__default
    );

    --eds_navigation__menu_title_color: var(--eds_text__static_icons__default);
    --eds_navigation__menu_tabs_color: var(--eds_text__static_icons__default);
    --eds_ui__accordion_header_color: var(--eds_text__static_icons__default);

    --eds_paragraph__overline_color: var(--eds_text__static_icons__default);
    --eds_paragraph__caption_color: var(--eds_text__static_icons__default);
    --eds_paragraph__body_short_color: var(--eds_text__static_icons__default);
    --eds_paragraph__body_long_color: var(--eds_text__static_icons__default);
    --eds_paragraph__meta_color: var(--eds_text__static_icons__default);
    --eds_paragraph__body_long_link_color: var(
      --eds_text__static_icons__default
    );

    --eds_interactive__icon_on_interactive_colors: var(
      --eds_text__static_icons__primary_white
    );

    --eds_ui__chip__badge_color: var(--eds_text__static_icons__default);
  }
`;
