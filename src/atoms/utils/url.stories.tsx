import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Url',
} as Meta;

export const IsValidUrl: StoryFn = () => {
  const codeText = `
  isValidUrl(
    url: string
  )
  => return true/false if an url is valid
  `;
  return <UtilStory name="isValidUrl" codeText={codeText} />;
};
