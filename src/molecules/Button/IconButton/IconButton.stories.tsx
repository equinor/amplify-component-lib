import { external_link, save } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { IconButton, IconButtonProps } from './IconButton';
import { spacings } from 'src/atoms';
import { Button, ButtonProps } from 'src/molecules';
import { Stack } from 'src/storybook';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof IconButton> = {
  title: 'Molecules/IconButton',
  component: IconButton,
  args: {
    icon: save,
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

export const LinkButton: StoryFn<ButtonProps> = () => (
  <>
    <IconButton to="/faq" icon={external_link} />
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
    'aria-label': 'Save',
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();

    const button = canvas.getByRole('button', { name: 'Save' });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const TestRendersAsLink: Story = {
  tags: ['test-only'],
  render: () => <IconButton to="/somewhere" aria-label="Save" icon={save} />,
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Save' });

    await expect(link).toBeInTheDocument();
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveAttribute('href', '/somewhere');
  },
};
