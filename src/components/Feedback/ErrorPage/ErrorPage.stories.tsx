import { Meta, StoryFn } from '@storybook/react';

import GlitchAnimation from './illustrations/GlitchAnimation';
import QuestioningAnimation from './illustrations/QuestioningAnimation';
import ErrorPage from '.';
import { ErrorType, getErrorContent } from 'src/utils/errors';

export default {
  title: 'Feedback/ErrorPage',
  component: ErrorPage,
  argTypes: {
    customized: { control: 'boolean' },
    robot: { control: 'radio', options: ['Glitch', 'Questioning'] },
    type: {
      control: 'radio',
      options: [
        ErrorType.DEFAULT,
        ErrorType.ERROR_400,
        ErrorType.ERROR_401,
        ErrorType.ERROR_403,
        ErrorType.ERROR_404,
        ErrorType.ERROR_500,
      ],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    haveMissingAccesses: { control: 'boolean' },
    missingAccesses: { control: 'array' },
    buttonText: { control: 'text' },
    haveDetails: { control: 'boolean' },
    details: { control: 'text' },
  },
  args: {
    customized: false,
    robot: 'Glitch',
    type: ErrorType.DEFAULT,
    title: 'Error title...',
    description: 'Error description...',
    haveMissingAccesses: false,
    missingAccesses: [
      { title: 'SMDA', url: 'https://accessit.equinor.com/#' },
      {
        title: 'SSDL relevant access groups',
        url: 'https://accessit.equinor.com/#',
      },
    ],
    buttonText: 'Button text...',
    haveDetails: false,
    details: 'More details...',
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const error = getErrorContent('Amplify portal', args.type);

  const customized = args.customized;
  return (
    <ErrorPage
      illustration={
        customized ? (
          args.robot === 'Glitch' ? (
            <GlitchAnimation />
          ) : (
            <QuestioningAnimation />
          )
        ) : (
          error.illustration
        )
      }
    >
      <ErrorPage.Title title={customized ? args.title : error.title} />
      <ErrorPage.Description
        text={customized ? args.description : error.description}
      />
      {args.haveMissingAccesses && (
        <ErrorPage.MissingAccesses accesses={args.missingAccesses} />
      )}
      <ErrorPage.Action
        buttonText={customized ? args.buttonText : error.button?.text}
        onClick={() => console.log('Clicked!')}
      />
      {args.haveDetails && <ErrorPage.Details text={args.details} />}
    </ErrorPage>
  );
};
