import { Meta, StoryFn } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Favicon',
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
