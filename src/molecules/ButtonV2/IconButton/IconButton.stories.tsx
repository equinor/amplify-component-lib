import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { IconButton, IconButtonProps } from './IconButton';
import { spacings } from 'src/atoms';
import { Stack } from 'src/storybook';

const meta: Meta<typeof IconButton> = {
  title: 'Molecules/IconButton',
  component: IconButton,
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
export const Introduction: StoryFn<IconButtonProps> = (args) => {
  return (
    <IconButton icon={save} {...args}>
      You can control me
    </IconButton>
  );
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
      <IconButton icon={save}>Filled</IconButton>
      <IconButton icon={save} variant="outlined">
        Outlined
      </IconButton>
      <IconButton icon={save} variant="ghost">
        Ghost
      </IconButton>
    </div>
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton icon={save} color="danger">
        Filled
      </IconButton>
      <IconButton icon={save} color="danger" variant="outlined">
        Outlined
      </IconButton>
      <IconButton icon={save} color="danger" variant="ghost">
        Ghost
      </IconButton>
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
