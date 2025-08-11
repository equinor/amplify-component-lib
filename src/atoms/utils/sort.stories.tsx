import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Sort',
} as Meta;

export const SortByDate: StoryFn = () => {
  const codeText = `
  sortByDate(
    a: Date | string,
    b: Date | string
  )
  => 1, -1 or 0 according do which of the dates comes first
  `;
  return <UtilStory name="sortByDate" codeText={codeText} />;
};

export const SortByWellboreName: StoryFn = () => {
  const codeText = `
  sortByWellboreName(
    a: { wellboreName: string } | string,
    b: { wellboreName: string } | string
  )
  => 1, -1 or 0 according do which of the wellbores come first
  `;
  return <UtilStory name="SortByWellboreName" codeText={codeText} />;
};
