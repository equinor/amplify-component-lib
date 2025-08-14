import { FC } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  FullPageSpinner,
  FullPageSpinnerProps,
} from 'src/molecules/FullPageSpinner/FullPageSpinner';

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
