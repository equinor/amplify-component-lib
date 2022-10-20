import { Meta, Story } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Url',
} as Meta;

export const isValidUrl: Story = () => {
  const codeText = `
  isValidUrl(
    url: string
  )
  => return true/false if an url is valid
  `;
  return <UtilStory name="isValidUrl" codeText={codeText} />;
};
