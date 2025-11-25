import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { InfoElement } from 'src/molecules/InfoElement/InfoElement';

import { expect, userEvent, within } from 'storybook/test';

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

// Test-only stories
export const TestStringContentRenders: Story = {
  tags: ['test-only'],
  args: {
    title: 'ANIMAL',
    content: 'Dog',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Dog' })).toBeInTheDocument();
    await expect(canvas.getByText('ANIMAL')).toBeInTheDocument();
  },
};

export const TestReactElementContentRenders: Story = {
  tags: ['test-only'],
  args: {
    title: 'TestTitle',
    content: <button>Click me!</button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /click me!/i })).toBeInTheDocument();
  },
};

export const TestCopyableContent: Story = {
  tags: ['test-only'],
  args: {
    title: 'TITLE',
    content: 'Copyable text',
    copyableContent: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const spy = vi.spyOn(window.navigator.clipboard, 'writeText');
    await user.click(canvas.getByText('Copyable text'));

    await expect(spy).toHaveBeenCalledWith('Copyable text');
    spy.mockRestore();
  },
};

export const TestCapitalizeContent: Story = {
  tags: ['test-only'],
  args: {
    title: 'TITLE',
    content: 'lowercase text',
    capitalizeContent: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('LOWERCASE TEXT')).toBeInTheDocument();
  },
};
