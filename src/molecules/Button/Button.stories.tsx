import { ChangeEvent, useState } from 'react';

import { Checkbox, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { chevron_down, save } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { ButtonProps } from 'src/molecules/Button/Button';
import { Button } from 'src/molecules/Button/Button';
import { Stack } from 'src/storybook';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
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
export const Introduction: StoryFn<ButtonProps> = (args) => {
  return <Button {...args} label="You can control me" />;
};
Introduction.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Basic: StoryFn<ButtonProps> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <Button label="Filled" variant="filled" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Ghost" variant="ghost" />
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <Button label="Filled" color="danger" />
      <Button label="Outlined" color="danger" variant="outlined" />
      <Button label="Ghost" color="danger" variant="ghost" />
    </div>
  </div>
);
Basic.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Disabled: StoryFn<ButtonProps> = () => (
  <div style={{ display: 'flex', gap: spacings.medium }}>
    <Button label="Filled" disabled />
    <Button label="Outlined" disabled variant="outlined" />
    <Button label="Ghost" disabled variant="ghost" />
  </div>
);
Disabled.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Accessibility: StoryFn<ButtonProps> = () => {
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
Accessibility.decorators = [
  (Story) => (
    <Stack direction="column">
      <Story />
    </Stack>
  ),
];

export const Icons: StoryFn<ButtonProps> = () => (
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
);
Icons.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Loading: StoryFn<ButtonProps> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
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
);
Loading.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const FullWidth: StoryFn<ButtonProps> = () => (
  <>
    <Button label="fullWidth" fullWidth leadingIcon={save} />
    <Button label="fullWidth" fullWidth trailingIcon={save} />
    <Button label="No fullWidth" leadingIcon={save} />
  </>
);
FullWidth.storyName = 'Full width';
FullWidth.decorators = [
  (Story) => (
    <div style={{ margin: '32px', display: 'grid', gridGap: '16px' }}>
      <Story />
    </div>
  ),
];

export const LinkButton: StoryFn<ButtonProps> = () => (
  <>
    <Button to="/faq" label="I am a link" />
  </>
);
LinkButton.storyName = 'Button as a link';
LinkButton.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

type Story = StoryObj<typeof Button>;

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
