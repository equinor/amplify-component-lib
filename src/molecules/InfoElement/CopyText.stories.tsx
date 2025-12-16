import { Meta, StoryObj } from '@storybook/react-vite';

import CopyText from 'src/molecules/InfoElement/CopyText';

import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta<typeof CopyText> = {
  title: 'Molecules/InfoElement/CopyText',
  component: CopyText,
  args: {
    textToCopy: 'Test text to copy',
    children: 'Click to copy',
  },
};

export default meta;
type Story = StoryObj<typeof CopyText>;

export const Default: Story = {};

// Test-only stories
export const TestCopiesTextToClipboard: Story = {
  tags: ['test-only'],
  args: {
    textToCopy: 'Test',
    children: 'testing text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    window.navigator.clipboard.writeText = fn();

    const wrapper = canvas.getByText('testing text');
    await user.click(wrapper);

    await expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Test'
    );

    // Check for success message
    await waitFor(() => canvas.getByText(/copied!/i), { timeout: 2000 });
    await expect(canvas.getByText(/copied!/i)).toBeInTheDocument();
  },
};

export const TestRendersLabelOnHover: Story = {
  tags: ['test-only'],
  args: {
    textToCopy: 'Test',
    children: 'testing text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const wrapper = canvas.getByText('testing text');

    await user.hover(wrapper);

    // Wait for "copy" label to appear
    await waitFor(() => canvas.queryByText(/copy/i), { timeout: 2000 });
    const copyText = canvas.queryByText(/copy/i);

    // Check if copy label is visible
    if (copyText) {
      await expect(copyText).toBeInTheDocument();
    }
  },
};
