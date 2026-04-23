import { ChangeEvent, useState } from 'react';

import { Checkbox, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { ButtonProps } from './Button';
import { spacings } from 'src/atoms';
import { Button } from 'src/molecules/Button/Button';
import { Stack } from 'src/storybook';

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
