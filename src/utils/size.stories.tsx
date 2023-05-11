import { Meta, StoryFn } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Size',
} as Meta;

export const formatBytes: StoryFn = () => {
  const codeText = `
  formatBytes(
    bytes: number,
    decimals = 2
  )
  => returns human readable byte size (KB, MB, GB ...)
  `;
  return <UtilStory name="formatBytes" codeText={codeText} />;
};

export const formatKiloBytes: StoryFn = () => {
  const codeText = `
  formatKiloBytes(
    kiloBytes: number,
    decimals = 2
  )
  => returns human readable byte size (KB, MB, GB ...)
  `;
  return <UtilStory name="formatKiloBytes" codeText={codeText} />;
};
