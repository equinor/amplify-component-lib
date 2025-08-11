import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Banner } from './Banner';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 20rem;
`;

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=5694-19571&t=RLoN5FomasdRBr2V-11',
    },
  },
  args: {
    variant: 'info',
    children: faker.airline.airplane().name,
  },
  decorators: (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {},
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: faker.airline.airplane().name,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: faker.airline.airplane().name,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: faker.airline.airplane().name,
  },
};
