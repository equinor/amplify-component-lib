import { Meta, Story } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Sort',
} as Meta;

export const sortByDate: Story = () => {
  const codeText = `
  sortByDate(
    a: Date | string,
    b: Date | string
  )
  => 1, -1 or 0 according do which of the dates comes first
  `;
  return <UtilStory name="sortByDate" codeText={codeText} />;
};

export const sortByWellboreName: Story = () => {
  const codeText = `
  sortByWellboreName(
    a: { wellboreName: string } | string,
    b: { wellboreName: string } | string
  )
  => 1, -1 or 0 according do which of the wellbores come first
  `;
  return <UtilStory name="SortByWellboreName" codeText={codeText} />;
};
