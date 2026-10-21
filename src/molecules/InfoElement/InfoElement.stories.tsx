import { Component, ReactNode, useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { InfoElement } from 'src/molecules/InfoElement/InfoElement';

import { expect, spyOn, userEvent, waitFor } from 'storybook/test';

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

export const WithUnit: Story = {
  args: {
    content: faker.number.int({ min: 1, max: 1000 }).toString(),
    unit: 'kg',
  },
};

export const CustomContent: Story = {
  args: {
    content: <button>Custom content!</button>,
  },
};

const TEST_TITLE = 'Test title';
const TEST_CONTENT = 'Test content';

export const TestStringContent: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: TEST_CONTENT },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: TEST_CONTENT })
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(TEST_TITLE.toUpperCase())
    ).toBeInTheDocument();
  },
};

export const TestReactElementContent: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: <button>Click me!</button> },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /click me!/i })
    ).toBeInTheDocument();
  },
};

export const TestCopyContent: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: TEST_CONTENT, copyableContent: true },
  play: async ({ canvas }) => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    await userEvent.click(canvas.getByText(TEST_CONTENT));

    await expect(canvas.getByText(/copied!/i)).toBeInTheDocument();
    await expect(spy).toHaveBeenCalledWith(TEST_CONTENT);
    await waitFor(() => expect(canvas.getByText(/copy/i)).toBeInTheDocument(), {
      timeout: 5000,
    });
  },
};

export const TestCopyLabelOnHover: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: TEST_CONTENT, copyableContent: true },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByText(TEST_CONTENT));
    await waitFor(() => expect(canvas.getByText(/copy/i)).toBeInTheDocument());

    await userEvent.unhover(canvas.getByText(TEST_CONTENT));
    await waitFor(
      () => expect(canvas.queryByText(/copy/i)).not.toBeInTheDocument(),
      { timeout: 5000 }
    );
  },
};

export const TestCapitalizeContent: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: TEST_CONTENT, capitalizeContent: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(TEST_CONTENT.toUpperCase())
    ).toBeInTheDocument();
  },
};

export const TestUnitAndCopyOnlyValue: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    title: TEST_TITLE,
    content: '42',
    unit: 'kg',
    copyableContent: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('kg')).toBeInTheDocument();

    const spy = spyOn(navigator.clipboard, 'writeText');
    await userEvent.click(canvas.getByText('42'));
    await expect(spy).toHaveBeenCalledWith('42');
  },
};

export const TestNoUnitByDefault: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: '42' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('42')).toBeInTheDocument();
    await expect(canvas.queryByText('kg')).not.toBeInTheDocument();
  },
};

export const TestUnitNotCapitalized: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    title: TEST_TITLE,
    content: 'value',
    unit: 'kg',
    capitalizeContent: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('VALUE')).toBeInTheDocument();
    await expect(canvas.getByText('kg')).toBeInTheDocument();
  },
};

class ErrorCatcher extends Component<
  { children: ReactNode },
  { error?: string }
> {
  state: { error?: string } = {};

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) return <p>{this.state.error}</p>;
    return this.props.children;
  }
}

const NON_STRING_ERROR =
  'copyableContent, capitalizeContent and unit only work when content is string';

export const TestThrowsWhenContentIsNotStringWithStringOnlyProps: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <div>
      {(['copyableContent', 'capitalizeContent', 'unit'] as const).map(
        (prop) => (
          <ErrorCatcher key={prop}>
            <InfoElement
              title={TEST_TITLE}
              content={<span>element</span>}
              {...{ [prop]: prop === 'unit' ? 'kg' : true }}
            />
          </ErrorCatcher>
        )
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText(NON_STRING_ERROR)).toHaveLength(3);
  },
};

export const TestCopyResetAfterUnmount: Story = {
  tags: ['!dev', '!autodocs'],
  args: { title: TEST_TITLE, content: TEST_CONTENT, copyableContent: true },
  render: function Render(args) {
    const [show, setShow] = useState(true);
    return (
      <div>
        {show && <InfoElement {...args} />}
        <button onClick={() => setShow(false)}>unmount</button>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText(TEST_CONTENT));
    await userEvent.click(canvas.getByText('unmount'));
    await expect(canvas.queryByText(TEST_CONTENT)).not.toBeInTheDocument();
    // Let the 3s reset timer fire after unmount
    await new Promise((resolve) => setTimeout(resolve, 3200));
  },
};
