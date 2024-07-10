import { Meta, StoryFn } from '@storybook/react';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Size',
} as Meta;

export const FormatBytes: StoryFn = () => {
  const codeText = `
  formatBytes(
    bytes: number,
    decimals = 2
  )
  => returns human readable byte size (KB, MB, GB ...)
  `;
  return <UtilStory name="formatBytes" codeText={codeText} />;
};

export const FormatKiloBytes: StoryFn = () => {
  const codeText = `
  formatKiloBytes(
    kiloBytes: number,
    decimals = 2
  )
  => returns human readable byte size (KB, MB, GB ...)
  `;
  return <UtilStory name="formatKiloBytes" codeText={codeText} />;
};
