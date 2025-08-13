import { Meta, StoryFn } from '@storybook/react-vite';

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
export const FormatDataSize: StoryFn = () => {
  const codeText = `
  formatDataSize(
    size: number,
    inputFormat = 'KiB'
    decimals = 2
  )
  => returns human-readable byte size (KiB, MiB, GiB ...)
  `;
  return <UtilStory name="formatDataSize" codeText={codeText} />;
};
