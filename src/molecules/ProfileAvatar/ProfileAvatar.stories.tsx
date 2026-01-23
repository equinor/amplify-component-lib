import { person } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import {
  nameToInitials,
  ProfileAvatar,
  ProfileAvatarProps,
} from 'src/molecules/ProfileAvatar/ProfileAvatar';

import { expect } from 'storybook/test';

const meta: Meta<typeof ProfileAvatar> = {
  title: 'Molecules/ProfileAvatar',
  component: ProfileAvatar,
  argTypes: {
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    url: { control: 'text' },
    size: {
      options: ['small', 'small-medium', 'medium', 'large'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    disabled: false,
    size: 'medium',
    url: 'data:image/png;base64,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',
    name: 'Minecraft Steve',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileAvatar>;

export const Primary: StoryFn<ProfileAvatarProps> = (args) => {
  return (
    <ProfileAvatar
      size={args.size}
      url={args.url}
      name={args.name}
      disabled={args.disabled}
    />
  );
};

export const WithoutImage: StoryFn<ProfileAvatarProps> = (args) => {
  return (
    <ProfileAvatar size={args.size} name={args.name} disabled={args.disabled} />
  );
};

export const TestFallbackNoName: Story = {
  tags: ['test-only'],
  args: {
    name: undefined,
    url: undefined,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      person.svgPathData
    );
  },
};

export const TestRenderImage: Story = {
  tags: ['test-only'],
  args: {
    name: 'Test User',
    url: 'https://via.placeholder.com/150',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img')).toBeInTheDocument();
  },
};

export const TestRenderInitials: Story = {
  tags: ['test-only'],
  args: {
    name: 'John Doe',
    url: undefined,
  },
  play: async ({ canvas }) => {
    const initials = nameToInitials('John Doe');
    await expect(canvas.getByText(initials!)).toBeInTheDocument();
  },
};

export const TestDisabledInitials: Story = {
  tags: ['test-only'],
  args: {
    name: 'Jane Smith',
    disabled: true,
    url: undefined,
  },
  play: async ({ canvas }) => {
    const initials = nameToInitials('Jane Smith');
    await expect(canvas.getByText(initials!)).toBeInTheDocument();
  },
};

export const TestFallbackEmptyNameAndUrl: Story = {
  tags: ['test-only'],
  args: {
    name: '',
    url: '',
  },
  play: async ({ canvas }) => {
    const icons = canvas.getAllByTestId('eds-icon-path');
    await expect(icons[0]).toHaveAttribute('d', person.svgPathData);
  },
};
