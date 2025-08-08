import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Coordinate',
} as Meta;

export const FormatLatLng: StoryFn = () => {
  const codeText = `
  formatLatLng(coordinate: number) => formatted string
  # Example: formatLatLng(58.252376489275) => 58.2523764
  `;
  return <UtilStory name="formatLatLng" codeText={codeText} />;
};

export const FormatUtm: StoryFn = () => {
  const codeText = `
  formatUtm(coordinate: number, decimals = 2) => formatted string
  # Example: formatUtm(47256000.234234) => 47256000.23m
  `;
  return <UtilStory name="formatUtm" codeText={codeText} />;
};
