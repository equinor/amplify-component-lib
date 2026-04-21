import { ChangeEvent, useState } from 'react';

import { Snackbar, Tooltip } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { ButtonV2, ButtonV2Props } from './ButtonV2';
import { spacings } from 'src/atoms';
import { Button, ButtonProps, Checkbox } from 'src/molecules';
import { Stack } from 'src/storybook';

const meta: Meta<typeof ButtonV2> = {
  title: 'Molecules/ButtonV2',
  component: ButtonV2,
  args: {
    variant: 'filled',
    color: 'primary',
    loading: undefined,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      type: 'boolean',
      description:
        'If true, the buttonV2 will show loading and onClick will be set to undefined',
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
export const Introduction: StoryFn<ButtonV2Props> = (args) => {
  return <ButtonV2 {...args}>You can control me</ButtonV2>;
};
Introduction.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Basic: StoryFn<ButtonV2Props> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2>Filled</ButtonV2>
      <ButtonV2 variant="outlined">Outlined</ButtonV2>
      <ButtonV2 variant="ghost">Ghost</ButtonV2>
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 color="danger">Filled</ButtonV2>
      <ButtonV2 color="danger" variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 color="danger" variant="ghost">
        Ghost
      </ButtonV2>
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

export const Disabled: StoryFn<ButtonV2Props> = () => (
  <div style={{ display: 'flex', gap: spacings.medium }}>
    <ButtonV2 disabled>Filled</ButtonV2>
    <ButtonV2 disabled variant="outlined">
      Outlined
    </ButtonV2>
    <ButtonV2 disabled variant="ghost">
      Ghost
    </ButtonV2>
  </div>
);
Disabled.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Accessibility: StoryFn<ButtonV2Props> = () => {
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
        <ButtonV2
          aria-disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) setOpen(true);
          }}
        >
          Submit
        </ButtonV2>
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

export const Icons: StoryFn<ButtonV2Props> = () => (
  <>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 leadingIcon={save}>Leading icon</ButtonV2>
      <ButtonV2 trailingIcon={save}>Trailing icon</ButtonV2>
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

export const Loading: StoryFn<ButtonV2Props> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 loading>Filled</ButtonV2>
      <ButtonV2 loading variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 loading variant="ghost">
        Ghost
      </ButtonV2>
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <ButtonV2 loading color="danger">
        Filled
      </ButtonV2>
      <ButtonV2 loading color="danger" variant="outlined">
        Outlined
      </ButtonV2>
      <ButtonV2 loading color="danger" variant="ghost">
        Ghost
      </ButtonV2>
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

export const FullWidth: StoryFn<ButtonV2Props> = () => (
  <>
    <ButtonV2 fullWidth leadingIcon={save}>
      fullWidth
    </ButtonV2>
    <ButtonV2 fullWidth trailingIcon={save}>
      fullWidth
    </ButtonV2>
    <ButtonV2 leadingIcon={save}>No fullWidth</ButtonV2>
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
