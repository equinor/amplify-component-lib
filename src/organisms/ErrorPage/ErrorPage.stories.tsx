import { Meta, StoryFn } from '@storybook/react';

import { GlitchAnimation } from './illustrations/GlitchAnimation';
import { QuestioningAnimation } from './illustrations/QuestioningAnimation';
import { ErrorPage } from '.';
import { ErrorType } from 'src/atoms';
import { getErrorContent } from 'src/atoms/utils/errors';

const meta: Meta = {
  title: 'Organisms/ErrorPage',
  component: ErrorPage,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19733&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
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
    missingAccesses: { control: 'object' },
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
};

export default meta;

interface ErrorPageStoryProps {
  customized: boolean;
  robot: string;
  type: ErrorType;
  title: string;
  description: string;
  haveMissingAccesses: boolean;
  missingAccesses: { title: string; url: string }[];
  buttonText: string;
  haveDetails: boolean;
  details: string;
}

export const Primary: StoryFn<ErrorPageStoryProps> = (args) => {
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
