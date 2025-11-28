import { colors } from 'src/atoms/style';
import { TagProps } from 'src/molecules/Tag/Tag';

export const TAG_COLORS: Record<
  NonNullable<TagProps['color']>,
  { text: string; background: string }
> = {
  blue: {
    text: colors.dataviz.darkblue.darker,
    background: colors.dataviz.darkblue.lighter,
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
    text: colors.dataviz.darkyellow.deep,
    background: colors.dataviz.lightyellow.lighter,
  },
  grey: {
    text: colors.dataviz.lightgray.darker,
    background: colors.dataviz.lightgray.pale,
  },
};
