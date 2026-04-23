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
      initialEntries: ['/'],
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
  return <Button {...args}>You can control me</Button>;
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
      <Button variant="filled">Filled</Button>
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
    <Button disabled>Filled</Button>
    <Button disabled variant="outlined">
      Outlined
    </Button>
    <Button disabled variant="ghost">
      Ghost
    </Button>
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
      <Button leadingIcon={save}>Leading icon</Button>
      <Button trailingIcon={save}>Trailing icon</Button>
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
    <Button fullWidth leadingIcon={save}>
      fullWidth
    </Button>
    <Button fullWidth trailingIcon={save}>
      fullWidth
    </Button>
    <Button leadingIcon={save}>No fullWidth</Button>
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
