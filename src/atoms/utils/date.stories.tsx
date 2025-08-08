import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Date',
} as Meta;

export const FormatDate: StoryFn = () => {
  const codeText = `
  formateDate(
    date: Date | string | null | undefined,
    options?: {
      format: 'DD.MM.YYYY' | 'DD. month YYYY' | 'YYYY-MM-DD' | 'DD.MM.YY' | 'DD. month',
      month?: 'short' | 'long'
  ) => formatted string
  # formatDate(new Date()) => 16. June 2021
  # formatDate(new Date(), {format: 'DD.MM.YYYY'}) => 16.06.2021
  # formatDate(new Date(), {format: 'DD.MM.YY'}) => 16.06.21
  # formatDate(new Date(), {format: 'YYYY-MM-DD'}) => 2021-06-16
  # formatDate(new Date(), {format: 'DD. month YYYY'}) => 16. June 2021
  # formatDate(new Date(), {format: 'DD. month', month: 'short'}) => 16. Dec
  `;
  return <UtilStory name="formatDate" codeText={codeText} />;
};

export const FormatDateTime: StoryFn = () => {
  const codeText = `
  formateDateTime(
    date: Date | string | null | undefined,
    options?: {
      month?: 'short' | 'long',
      isGMT?: boolean (adds/subtracts hours to local time)
    } = { month: 'long', isGMT: false }
  ) => formatted string
  # formatDateTime(date) => 19. January 2022, 01:32
  # formatDateTime(date) => 19. Jan 2022, 01:32
  `;
  return <UtilStory name="formatDateTime" codeText={codeText} />;
};

export const FormatRelativeDateTime: StoryFn = () => {
  const codeText = `
  formatRelativeDateTime(
    date: Date | string | null | undefined,
    isGMT = false
  ) => formatted string, relative to the current time
  # formatRelativeDateTime(new Date()) => Today at 7:17
  # formatRelativeDateTime(new Date(2018, 11, 24, 10, 33)) => 24. November 2018, 10:33
  `;
  return <UtilStory name="formatRelativeDateTime" codeText={codeText} />;
};

export const IsBetweenDates: StoryFn = () => {
  const codeText = `
  isBetweenDates(
    date: Date | string | null | undefined,
    dates: [Date, Date]
  ) => return true if the date param is between the dates
  `;
  return <UtilStory name="isBetweenDates" codeText={codeText} />;
};
