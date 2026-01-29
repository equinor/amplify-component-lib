import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { PageTitle } from './PageTitle';

import { expect, userEvent } from 'storybook/test';

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

function Component({ title }: { title: string }) {
  const [rerender, setRerender] = useState(0);
  return (
    <PageTitle title={title}>
      <div>
        <button onClick={() => setRerender(rerender + 1)}>Click me</button>
        {rerender}
      </div>
    </PageTitle>
  );
}

export const TestSetsDocumentTitle: Story = {
  tags: ['test-only'],
  render: Component,
  args: {
    title: faker.book.title(),
  },
  play: async ({ canvas, args }) => {
    await expect(document.title).toContain(args.title);
    await userEvent.click(canvas.getByRole('button'));
    await expect(document.title).toContain(args.title);
    await userEvent.click(canvas.getByRole('button'));
  },
};
