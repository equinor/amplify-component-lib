import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { PageTitle } from './PageTitle';

import { expect } from 'storybook/test';

const meta: Meta<typeof PageTitle> = {
  title: 'Organisms/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Example Page Title',
  },
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: 'My Page Title',
    children: <div>Page content goes here</div>,
  },
};

const testTitle = faker.book.title();
export const TestSetsDocumentTitle: Story = {
  tags: ['test-only'],
  args: {
    title: testTitle,
    children: <div>Test content</div>,
  },
  play: async () => {
    await expect(document.title).toContain(testTitle);
  },
};
