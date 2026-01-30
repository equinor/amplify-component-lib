import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Status } from '.';
import {
  DEFAULT_ACTION_TEXT,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from 'src/organisms/Status/Status.constants';
import { StatusWrapper } from 'src/storybook/StatusWrapper';

import { action } from 'storybook/actions';
import { expect } from 'storybook/test';

interface StatusStoryProps {
  customized: boolean;
  center: boolean | undefined;
  expectedBackgroundColor: string | undefined;
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
    center: { control: 'boolean' },
    expectedBackgroundColor: { control: 'color' },
    title: { control: 'text' },
    description: { control: 'text' },
    haveMissingAccesses: { control: 'boolean' },
    missingAccesses: { control: 'object' },
    buttonText: { control: 'text' },
  },
  args: {
    center: undefined,
    expectedBackgroundColor: undefined,
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
    <StatusWrapper>
      <Status
        center={args.center}
        expectedBackgroundColor={args.expectedBackgroundColor}
      >
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
    </StatusWrapper>
  );
};

export const WithMissingAccesses: StoryFn<StatusStoryProps> = (args) => {
  const handleOnButtonClick = () => {
    action('Button clicked')();
  };

  return (
    <StatusWrapper>
      <Status
        center={args.center}
        expectedBackgroundColor={args.expectedBackgroundColor}
      >
        <Status.Title title="Missing some accesses" />
        <Status.Description text="To use this app you need some accesses" />
        <Status.MissingAccesses accesses={args.missingAccesses} />
        <Status.Action
          buttonText="Go to AccessIT"
          onClick={handleOnButtonClick}
        />
      </Status>
    </StatusWrapper>
  );
};

type Story = StoryObj<typeof Status>;

export const TestDefaultValues: Story = {
  tags: ['test-only'],
  render: () => (
    <StatusWrapper>
      <Status>
        <Status.Title />
        <Status.Description />
        <Status.Action onClick={() => {}} />
      </Status>
    </StatusWrapper>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('title')).toHaveTextContent(DEFAULT_TITLE);
    await expect(canvas.getByTestId('description')).toHaveTextContent(
      DEFAULT_DESCRIPTION
    );
    await expect(canvas.getByRole('button')).toHaveTextContent(
      DEFAULT_ACTION_TEXT
    );
  },
};

export const TestMissingAccessesLink: Story = {
  tags: ['test-only'],
  render: () => {
    const fakeAccess = {
      title: 'Test Access',
      url: 'https://example.com',
    };
    return (
      <StatusWrapper>
        <Status>
          <Status.Title />
          <Status.Description />
          <Status.MissingAccesses accesses={[fakeAccess]} />
        </Status>
      </StatusWrapper>
    );
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://example.com');
  },
};

export const TestCenterProp: Story = {
  tags: ['test-only'],
  render: () => (
    <StatusWrapper>
      <Status center={false}>
        <Status.Title />
        <Status.Description />
      </Status>
    </StatusWrapper>
  ),
  play: async ({ canvas }) => {
    const container = canvas.getByTestId('status-container');
    await expect(container).not.toHaveStyle('position: fixed');
  },
};
