import { external_link, save } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { spacings } from 'src/atoms/style';
import { IconButton } from 'src/molecules/Button/IconButton/IconButton';
import { Stack } from 'src/storybook';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof IconButton> = {
  title: 'Molecules/IconButton',
  component: IconButton,
  decorators: [
    (Story) => (
      <Stack>
        <Story />
      </Stack>
    ),
  ],
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
type Story = StoryObj<typeof IconButton>;

export const Introduction: Story = {
  render: (args) => <IconButton {...args} icon={save} />,
};

export const Basic: Story = {
  render: (args) => (
    <VariantShowcase
      GenericComponent={IconButton}
      otherProps={args}
      style={{ justifyItems: 'center' }}
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
      <IconButton icon={save} disabled />
      <IconButton icon={save} disabled variant="outlined" />
      <IconButton icon={save} disabled variant="ghost" />
    </div>
  ),
};

export const Shape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacings.medium }}>
      <IconButton shape="circular" icon={save} />
      <IconButton shape="square" icon={save} />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
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
  ),
};

export const LinkButton: Story = {
  render: () => <IconButton to="/faq" icon={external_link} />,
  name: 'Button as a link',
};

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
