import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { Status } from '.';

interface StatusStoryProps {
  customized: boolean;
  title: string;
  description: string;
  haveMissingAccesses: boolean;
  missingAccesses: { title: string; url: string }[];
  buttonText: string;
}
const meta: Meta = {
  title: 'Organisms/Status',
  component: Status,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=9434-152369&m=dev',
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    haveMissingAccesses: { control: 'boolean' },
    missingAccesses: { control: 'object' },
    buttonText: { control: 'text' },
  },
  args: {
    title: 'Something went wrong',
    description:
      'Try again later or use our feedback form if the problems persists.',
    haveMissingAccesses: false,
    missingAccesses: [
      { title: 'SMDA', url: 'https://accessit.equinor.com/#' },
      {
        title: 'SSDL relevant access groups',
        url: 'https://accessit.equinor.com/#',
      },
    ],
    buttonText: 'Back to previous page',
  },
};

export default meta;

export const Default: StoryFn<StatusStoryProps> = (args) => {
  const handleOnButtonClick = () => {
    action('Button clicked')();
  };

  return (
    <Status>
      <Status.Title title={args.title} />
      <Status.Description text={args.description} />
      {args.haveMissingAccesses && (
        <Status.MissingAccesses accesses={args.missingAccesses} />
      )}
      <Status.Action
        buttonText={args.buttonText}
        onClick={handleOnButtonClick}
      />
    </Status>
  );
};

export const WithMissingAccesses: StoryFn<StatusStoryProps> = (args) => {
  const handleOnButtonClick = () => {
    action('Button clicked')();
  };

  return (
    <Status>
      <Status.Title title="Missing some accesses" />
      <Status.Description text="To use this app you need some accesses" />
      <Status.MissingAccesses accesses={args.missingAccesses} />
      <Status.Action
        buttonText="Go to AccessIT"
        onClick={handleOnButtonClick}
      />
    </Status>
  );
};
