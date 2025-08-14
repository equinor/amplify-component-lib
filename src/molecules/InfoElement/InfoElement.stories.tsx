import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { InfoElement } from 'src/molecules/InfoElement/InfoElement';

const meta: Meta<typeof InfoElement> = {
  title: 'Molecules/InfoElement',
  component: InfoElement,
  args: {
    title: faker.airline.airline().name,
  },
};

export default meta;
type Story = StoryObj<typeof InfoElement>;

export const Default: Story = {
  args: {
    content: faker.airline.airplane().name,
  },
};

export const CopyableContent: Story = {
  args: {
    content: faker.airline.airplane().name,
    copyableContent: true,
  },
};

export const CapitalizedContent: Story = {
  args: {
    content: faker.airline.airplane().name,
    capitalizeContent: true,
  },
};

export const CustomContent: Story = {
  args: {
    content: <button>Custom content!</button>,
  },
};
