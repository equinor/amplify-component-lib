import { colors } from 'src/atoms/style';
import { BaseTagProps } from 'src/molecules/Tag/Tag';

export interface TagColorTokens {
  text: string;
  background: string;
  border?: string;
}

type TagColors = Record<NonNullable<BaseTagProps['color']>, TagColorTokens>;

const PASTEL_COLORS: TagColors = {
  blue: {
    text: colors.dataviz.darkblue.darker,
    background: colors.dataviz.lightblue.lighter,
  },
  green: {
    text: colors.dataviz.darkgreen.darker,
    background: colors.dataviz.lightgreen.lighter,
  },
  purple: {
    text: colors.dataviz.darkpurple.darker,
    background: colors.dataviz.lightpurple.lighter,
  },
  ['dark pink']: {
    text: colors.dataviz.darkpink.darker,
    background: colors.dataviz.darkpink.lighter,
  },
  pink: {
    text: colors.dataviz.lightpink.deep,
    background: colors.dataviz.lightpink.lighter,
  },
  orange: {
    text: colors.dataviz.orange.darker,
    background: colors.dataviz.orange.lighter,
  },
  yellow: {
    text: colors.dataviz.darkyellow.darker,
    background: colors.dataviz.lightyellow.lighter,
  },
  grey: {
    text: colors.text.static_icons__default.rgba,
    background: colors.dataviz.lightgray.pale,
  },
  success: {
    text: colors.interactive.success__text_hover.rgba,
    background: colors.ui.background__success.rgba,
  },
  warning: {
    text: colors.interactive.warning__text_hover.rgba,
    background: colors.ui.background__warning.rgba,
  },
  danger: {
    text: colors.interactive.danger__text_hover.rgba,
    background: colors.ui.background__danger.rgba,
  },
  white: {
    text: colors.text.static_icons__secondary.rgba,
    background: colors.ui.background__light.rgba,
  },
};

const VIBRANT_TEXT = colors.text.static_icons__primary_white.hex;

const VIBRANT_COLORS: TagColors = {
  blue: { text: VIBRANT_TEXT, background: colors.dataviz.darkblue.default },
  green: { text: VIBRANT_TEXT, background: colors.dataviz.darkgreen.default },
  purple: { text: VIBRANT_TEXT, background: colors.dataviz.darkpurple.default },
  ['dark pink']: {
    text: VIBRANT_TEXT,
    background: colors.dataviz.darkpink.default,
  },
  pink: { text: VIBRANT_TEXT, background: colors.dataviz.lightpink.darker },
  orange: { text: VIBRANT_TEXT, background: colors.dataviz.orange.default },
  yellow: { text: VIBRANT_TEXT, background: colors.dataviz.lightyellow.darker },
  grey: { text: VIBRANT_TEXT, background: colors.dataviz.darkgray.deep },
  success: {
    text: VIBRANT_TEXT,
    background: colors.interactive.success__text.rgba,
  },
  warning: {
    text: VIBRANT_TEXT,
    background: colors.interactive.warning__text.rgba,
  },
  danger: {
    text: VIBRANT_TEXT,
    background: colors.interactive.danger__text.rgba,
  },
  white: {
    text: colors.text.static_icons__secondary.rgba,
    background: colors.ui.background__default.hex,
  },
};

const OUTLINED_COLORS: TagColors = {
  blue: {
    text: colors.dataviz.darkblue.darker,
    border: colors.dataviz.darkblue.darker,
    background: colors.dataviz.lightblue.lighter,
  },
  green: {
    text: colors.dataviz.darkgreen.darker,
    border: colors.dataviz.darkgreen.darker,
    background: colors.dataviz.lightgreen.lighter,
  },
  purple: {
    text: colors.dataviz.darkpurple.darker,
    border: colors.dataviz.darkpurple.darker,
    background: colors.dataviz.lightpurple.lighter,
  },
  ['dark pink']: {
    text: colors.dataviz.darkpink.darker,
    border: colors.dataviz.darkpink.darker,
    background: colors.dataviz.darkpink.lighter,
  },
  pink: {
    text: colors.dataviz.lightpink.deep,
    border: colors.dataviz.lightpink.deep,
    background: colors.dataviz.lightpink.lighter,
  },
  orange: {
    text: colors.dataviz.orange.darker,
    border: colors.dataviz.orange.darker,
    background: colors.dataviz.orange.lighter,
  },
  yellow: {
    text: colors.dataviz.darkyellow.darker,
    border: colors.dataviz.darkyellow.darker,
    background: colors.dataviz.lightyellow.lighter,
  },
  grey: {
    text: colors.text.static_icons__default.rgba,
    border: colors.text.static_icons__default.rgba,
    background: colors.dataviz.lightgray.pale,
  },
  success: {
    text: colors.interactive.success__text_hover.rgba,
    border: colors.interactive.success__text_hover.rgba,
    background: colors.ui.background__success.rgba,
  },
  warning: {
    text: colors.interactive.warning__text_hover.rgba,
    border: colors.interactive.warning__text_hover.rgba,
    background: colors.ui.background__warning.rgba,
  },
  danger: {
    text: colors.interactive.danger__text_hover.rgba,
    border: colors.interactive.danger__text_hover.rgba,
    background: colors.ui.background__danger.rgba,
  },
  white: {
    text: colors.text.static_icons__secondary.rgba,
    border: colors.text.static_icons__secondary.rgba,
    background: colors.ui.background__light.rgba,
  },
};

export const TAG_COLORS: Record<
  NonNullable<BaseTagProps['variant']>,
  TagColors
> = {
  pastel: PASTEL_COLORS,
  vibrant: VIBRANT_COLORS,
  outlined: OUTLINED_COLORS,
};
