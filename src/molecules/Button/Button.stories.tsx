import { ChangeEvent, useState } from 'react';

import { Checkbox, Icon, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { chevron_down, save } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { Stack } from 'src/storybook';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
  decorators: [
    (Story) => (
      <Stack>
        <Story />
      </Stack>
    ),
  ],

  args: {
    variant: 'filled',
    color: 'primary',
    loading: undefined,
  },
  parameters: {
    router: {
      initial: '/',
      routes: ['$'],
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
      type: 'boolean',
      description:
        'If true, the button will show loading and onClick will be set to undefined',
    },
    disabled: { control: 'boolean', type: 'boolean' },
    variant: {
      options: ['filled', 'outlined', 'ghost'],
      control: {
        type: 'select',
      },
    },
    color: {
      options: ['primary', 'danger'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;
export const Introduction: Story = {
  render: (args) => <Button {...args}>You can control me</Button>,
};

export const Basic: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
    >
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button>Filled</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button color="danger">Filled</Button>
        <Button color="danger" variant="outlined">
          Outlined
        </Button>
        <Button color="danger" variant="ghost">
          Ghost
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <Button disabled>Filled</Button>
      <Button disabled variant="outlined">
        Outlined
      </Button>
      <Button disabled variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

const AccessibilityComponent = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Checkbox
        label="I agree to the Terms & Conditions (required)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCanSubmit(e.target.checked);
        }}
        checked={canSubmit}
      />
      <Tooltip title={canSubmit ? '' : 'Terms & Conditions must be checked'}>
        <Button
          aria-disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) setOpen(true);
          }}
        >
          Submit
        </Button>
      </Tooltip>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        Submitted
      </Snackbar>
    </>
  );
};

export const Accessibility: Story = {
  render: AccessibilityComponent,
};

export const Icons: Story = {
  render: () => (
    <>
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button>
          <Icon data={save} />
          Leading icon
        </Button>
        <Button>
          Trailing icon
          <Icon data={save} />
        </Button>
        <Button>
          <Icon data={save} />
          Both icons
          <Icon data={chevron_down} />
        </Button>
      </div>
    </>
  ),
};

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacings.medium,
      }}
    >
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button loading>Filled</Button>
        <Button loading variant="outlined">
          Outlined
        </Button>
        <Button loading variant="ghost">
          Ghost
        </Button>
      </div>
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button loading color="danger">
          Filled
        </Button>
        <Button loading color="danger" variant="outlined">
          Outlined
        </Button>
        <Button loading color="danger" variant="ghost">
          Ghost
        </Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        margin: '32px',
        display: 'grid',
        gridGap: '16px',
        width: '100%',
      }}
    >
      <Button fullWidth>
        <Icon data={save} />
        fullWidth
      </Button>
      <Button fullWidth>
        fullWidth
        <Icon data={save} />
      </Button>
      <Button>
        <Icon data={save} />
        No fullWidth
      </Button>
    </div>
  ),
  name: 'Full width',
};

export const LinkButton: Story = {
  render: () => {
    return <Button to="/faq">I am a link</Button>;
  },
  name: 'Button as a link',
};

export const TestLoadingState: Story = {
  tags: ['test-only'],
  render: (args) => {
    return <Button {...args}>Loading Button</Button>;
  },
  args: {
    loading: true,
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
    await expect(canvas.queryByText('Loading Button')).not.toBeVisible();

    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TestRendersAsLink: Story = {
  tags: ['test-only'],
  render: () => <Button to="/somewhere">Save</Button>,
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Save' });

    await expect(link).toBeInTheDocument();
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveAttribute('href', '/somewhere');
  },
};
