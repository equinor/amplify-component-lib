import { ChangeEvent, useState } from 'react';

import { Checkbox, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { chevron_down, save } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { Stack } from 'src/storybook';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

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
  render: (args) => <Button {...args} label="You can control me" />,
};

export const Basic: Story = {
  render: (args) => (
    <VariantShowcase
      GenericComponent={Button}
      otherProps={{ ...args, label: 'Button' }}
      columns={[
        { label: 'Filled', value: { variant: 'filled' } },
        { label: 'Outlined', value: { variant: 'outlined' } },
        { label: 'Ghost', value: { variant: 'ghost' } },
      ]}
      rows={[
        { label: 'Primary', value: { color: 'primary' } },
        { label: 'Danger', value: { color: 'danger' } },
      ]}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <Button label="Filled" disabled />
      <Button label="Outlined" disabled variant="outlined" />
      <Button label="Ghost" disabled variant="ghost" />
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
          label="Submit"
          aria-disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) setOpen(true);
          }}
        />
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
        <Button label="Leading icon" leadingIcon={save} />
        <Button label="Trailing icon" trailingIcon={save} />
        <Button
          label="Both icons"
          leadingIcon={save}
          trailingIcon={chevron_down}
        />
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
        <Button label="Filled" loading />
        <Button label="Outlined" loading variant="outlined" />
        <Button label="Ghost" loading variant="ghost" />
      </div>
      <div style={{ display: 'flex', gap: spacings.medium }}>
        <Button label="Filled" loading color="danger" />
        <Button label="Outlined" loading color="danger" variant="outlined" />
        <Button label="Ghost" loading color="danger" variant="ghost" />
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
      <Button label="fullWidth" fullWidth leadingIcon={save} />
      <Button label="fullWidth" fullWidth trailingIcon={save} />
      <Button label="No fullWidth" leadingIcon={save} />
    </div>
  ),
  name: 'Full width',
};

export const LinkButton: Story = {
  render: () => {
    return <Button to="/faq" label="I am a link" />;
  },
  name: 'Button as a link',
};

export const TestLoadingState: Story = {
  tags: ['test-only'],
  args: {
    loading: true,
    label: 'Loading Button',
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
  render: () => <Button to="/somewhere" label="Save" />,
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Save' });

    await expect(link).toBeInTheDocument();
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveAttribute('href', '/somewhere');
  },
};
