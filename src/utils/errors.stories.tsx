import { Meta, StoryFn } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Error',
} as Meta;

export const GetListOfErrors: StoryFn = () => {
  const codeText = `
  getListOfErrors(
    appName: string,
  ) => returns list of errors with their default content as ErrorContentType[] = {
  type: ErrorsType;
  illustration: ReactNode;
  title: string;
  description?: string;
  button?: { text?: string; onClick?: () => void };
}[]
  `;
  return <UtilStory name="getListOfErrors" codeText={codeText} />;
};
export const GetErrorContent: StoryFn = () => {
  const codeText = `
  getErrorContent(
    appName: string,
    errorType?: ErrorsType       // '400' | '401' | '403' | '404' | '500' | 'default'
  ) => returns  default content of a specific error as ErrorContentType = {
  type: ErrorsType;
  illustration: ReactNode;
  title: string;
  description?: string;
  button?: { text?: string; onClick?: () => void };
}
  `;
  return <UtilStory name="getErrorContent" codeText={codeText} />;
};
