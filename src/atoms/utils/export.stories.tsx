import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Export',
} as Meta;

export const ExportComponent: StoryFn = () => {
  const codeText = `
  exportComponent(
    node: RefObject<HTMLElement>,
    backgroundColor?: string)
  => Image of node (with background color) to clipboard
  `;
  return <UtilStory name="exportComponent" codeText={codeText} />;
};
