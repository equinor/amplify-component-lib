import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Favicon',
} as Meta;

export const SetupIcons: StoryFn = () => {
  const codeText = `
  setupIcons(
    lightFaviconId: string,
    darkFaviconId: string
  )
  => Sets up the correct favicons (and changes them based on dark/light mode)
  `;
  return <UtilStory name="setupIcons" codeText={codeText} />;
};
