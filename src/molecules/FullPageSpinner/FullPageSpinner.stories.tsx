import { FC } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  FullPageSpinner,
  FullPageSpinnerProps,
} from 'src/molecules/FullPageSpinner/FullPageSpinner';

import { expect, within } from 'storybook/test';
import styled from 'styled-components';

const Container = styled.div`
  aspect-ratio: 16 / 9;
  width: 50rem;
  overflow: auto;
`;

const StoryComponent: FC<FullPageSpinnerProps> = (props) => {
  return (
    <Container>
      <FullPageSpinner {...props} />
    </Container>
  );
};

const meta: Meta<typeof StoryComponent> = {
  title: 'Molecules/FullPageSpinner',
  component: StoryComponent,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['equinor', 'circle', 'dots', 'application'],
    },
    withScrim: { control: 'boolean' },
  },
  args: {},
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19817&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
    env: () => ({
      VITE_NAME: 'orca',
    }),
  },
};

export default meta;
type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('generic')[1]).not.toHaveStyle(
      'background-color: white'
    );
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};

export const Equinor: Story = {
  args: {
    variant: 'equinor',
  },
};

export const WithScrim: Story = {
  tags: ['test-only'],
  args: {
    withScrim: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Just verify the spinner is rendered (can't test Scrim styling in browser)
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  },
};

export const EquinorVariant: Story = {
  tags: ['test-only'],
  args: {
    withScrim: true,
    variant: 'equinor',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByTestId('full-page-spinner-equinor')
    ).toBeInTheDocument();
  },
};

export const CircleVariant: Story = {
  tags: ['test-only'],
  args: {
    variant: 'circle',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByTestId('full-page-spinner-circle')
    ).toBeInTheDocument();
  },
};

export const DotsVariant: Story = {
  tags: ['test-only'],
  args: {
    variant: 'dots',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByTestId('full-page-spinner-dots')
    ).toBeInTheDocument();
  },
};

export const ChildrenHidden: Story = {
  tags: ['test-only'],
  args: {
    children: 'Hidden text content',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText('Hidden text content');
    await expect(text).not.toBeVisible();
  },
};

export const ChildrenHiddenWithScrim: Story = {
  tags: ['test-only'],
  args: {
    withScrim: true,
    children: 'Hidden with scrim',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify spinner renders and children are hidden
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
    const text = canvas.getByText('Hidden with scrim');
    await expect(text).not.toBeVisible();
  },
};
