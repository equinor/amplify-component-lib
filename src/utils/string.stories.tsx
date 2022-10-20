import { Meta, Story } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/String',
} as Meta;

export const capitalize: Story = () => {
  const codeText = `
  capitalize(
    str: string
  )
  => return capitalized string (works with several words as well)
  # capitalize('johan sverdrup') => 'Johan Sverdrup' 
  `;
  return <UtilStory name="capitalize" codeText={codeText} />;
};
