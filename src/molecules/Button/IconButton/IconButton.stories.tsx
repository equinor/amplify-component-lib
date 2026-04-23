import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { IconButton, IconButtonProps } from './IconButton';
import { spacings } from 'src/atoms';
import { Stack } from 'src/storybook';

const meta: Meta<typeof IconButton> = {
  title: 'Molecules/IconButton',
  component: IconButton,
  args: {
    icon: save,
    variant: 'filled',
    color: 'primary',
    loading: undefined,
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

export const Introduction: StoryFn<IconButtonProps> = (args) => {
  return <IconButton {...args} icon={save} />;
};
Introduction.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Basic: StoryFn<IconButtonProps> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton icon={save} />
      <IconButton icon={save} variant="outlined" />
      <IconButton icon={save} variant="ghost" />
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton icon={save} color="danger" />
      <IconButton icon={save} color="danger" variant="outlined" />
      <IconButton icon={save} color="danger" variant="ghost" />
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

export const Disabled: StoryFn<IconButtonProps> = () => (
  <div style={{ display: 'flex', gap: spacings.medium }}>
    <IconButton icon={save} disabled />
    <IconButton icon={save} disabled variant="outlined" />
    <IconButton icon={save} disabled variant="ghost" />
  </div>
);
Disabled.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Shape: StoryFn<IconButtonProps> = () => (
  <div style={{ display: 'flex', gap: spacings.medium }}>
    <IconButton shape="circular" icon={save} />
    <IconButton shape="square" icon={save} />
  </div>
);
Shape.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

export const Loading: StoryFn<IconButtonProps> = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: spacings.medium }}
  >
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton shape="circular" variant="filled" icon={save} loading />
      <IconButton shape="circular" variant="ghost" icon={save} loading />
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton shape="circular" color="danger" icon={save} loading />
      <IconButton
        shape="circular"
        variant="ghost"
        color="danger"
        icon={save}
        loading
      />
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
