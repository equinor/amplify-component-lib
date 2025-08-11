import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/String',
} as Meta;

export const Capitalize: StoryFn = () => {
  const codeText = `
  capitalize(
    str: string
  )
  => return capitalized string (works with several words as well)
  # capitalize('johan sverdrup') => 'Johan Sverdrup' 
  `;
  return <UtilStory name="capitalize" codeText={codeText} />;
};
