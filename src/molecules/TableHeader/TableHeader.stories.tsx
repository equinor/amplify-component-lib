import { filter_list, users_circle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { TableHeader } from './TableHeader';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof TableHeader> = {
  title: 'Molecules/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=19153-6430&m=dev',
    },
  },
  args: {
    children: 'Table Data Header',
    leadingIcon: users_circle,
    sorting: {
      isSorting: undefined,
      onSortClick: fn(),
    },
  },
  argTypes: {
    onClick: {
      control: 'select',
      options: ['undefined', 'WithOnClick'],
      mapping: {
        undefined: undefined,
        WithOnClick: fn(),
      },
    },
    sorting: {
      control: 'select',
      options: ['undefined', 'WithAscSorting', 'WithDescSorting'],
      mapping: {
        undefined: undefined,
        WithAscSorting: { isSorting: 'asc', onSortClick: fn() },
        WithDescSorting: { isSorting: 'desc', onSortClick: fn() },
      },
    },
    variant: {
      control: 'select',
      options: ['undefined', 'warning', 'error'],
      mapping: {
        undefined: undefined,
        warning: 'warning',
        error: 'error',
      },
    },
    leadingIcon: {
      control: 'select',
      options: ['undefined', 'UsersCircle'],
      mapping: {
        undefined: undefined,
        UsersCircle: users_circle,
      },
    },
    trailingAction: {
      control: 'select',
      options: ['undefined', 'FilterAction'],
      mapping: {
        undefined: undefined,
        FilterAction: { icon: filter_list, onClick: fn() },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
  args: {
    children: 'Mt. Fuji (富士)',
    leadingIcon: undefined,
    onClick: undefined,
    sorting: {
      isSorting: 'asc',
      onSortClick: fn(),
    },
  },
};

export const Variants: Story = {
  args: {
    leadingIcon: undefined,
    children: 'Table Data Header',
    sorting: {
      isSorting: 'asc',
      onSortClick: fn(),
    },
  },
  render: (args) => (
    <VariantShowcase
      GenericComponent={TableHeader}
      otherProps={args}
      columns={[
        { label: 'Default', value: { onClick: undefined } },
        { label: 'Clickable', value: { onClick: fn() } },
      ]}
      rows={[
        { label: 'Default', value: { variant: undefined } },
        { label: 'Warning', value: { variant: 'warning' } },
        { label: 'Error', value: { variant: 'error' } },
      ]}
    />
  ),
};

export const WithOnClick: Story = {
  args: {
    children: 'トヨタ',
    onClick: fn(),
    sorting: undefined,
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText(args.children));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithOnSortAsc: Story = {
  args: {
    children: 'マツダ',
    sorting: {
      onSortClick: fn(),
      isSorting: 'asc',
    },
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText(args.children));
    await expect(args.sorting?.onSortClick).toHaveBeenCalled();
  },
};

export const WithOnSortDesc: Story = {
  args: {
    children: 'マツダ',
    sorting: {
      onSortClick: fn(),
      isSorting: 'desc',
    },
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText(args.children));
    await expect(args.sorting?.onSortClick).toHaveBeenCalled();
  },
};

export const WithoutSorting: Story = {
  args: {
    children: 'Mt. Fuji (富士)',
    leadingIcon: undefined,
    onClick: undefined,
    sorting: undefined,
  },
};

export const WithTrailingAction: Story = {
  args: {
    leadingIcon: undefined,
    children: 'ホンダ',
    trailingAction: {
      onClick: fn(),
      icon: filter_list,
    },
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.trailingAction?.onClick).toHaveBeenCalled();
  },
};
