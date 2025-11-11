import { Fragment } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { filter_list, users_circle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { TableHeader } from './TableHeader';
import { colors, shape, spacings } from 'src/atoms';

import { expect, fn, userEvent } from 'storybook/test';
import styled from 'styled-components';

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

const VariantsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-template-rows: repeat(6, 1fr);
  gap: ${spacings.small};
`;

const VariantHeaderPath = styled.span`
  position: relative;
  width: 10px;
  height: 100%;
  border-top-left-radius: ${shape.button.borderRadius};
  border-bottom-left-radius: ${shape.button.borderRadius};
  border-left: 2px solid ${colors.text.static_icons__default.rgba};
  border-top: 2px solid ${colors.text.static_icons__default.rgba};
  border-bottom: 2px solid ${colors.text.static_icons__default.rgba};
  &::after {
    content: '';
    background: ${colors.text.static_icons__default.rgba};
    height: 2px;
    width: 6px;
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

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

const VARIANT_OBJECT = {
  Default: [{}, { onClick: fn() }],
  Warning: [
    {
      variant: 'warning',
    },
    { variant: 'warning', onClick: fn() },
  ],
  Error: [
    {
      variant: 'error',
    },
    {
      variant: 'error',
      onClick: fn(),
    },
  ],
} as const;

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
    <VariantsContainer>
      {(Object.keys(VARIANT_OBJECT) as (keyof typeof VARIANT_OBJECT)[]).map(
        (key) => (
          <Fragment key={key}>
            <Typography variant="ingress">{key}</Typography>
            <VariantHeaderPath />
            <TableHeader {...args} {...VARIANT_OBJECT[key][0]} />
            <Typography variant="ingress">Clickable {key}</Typography>
            <VariantHeaderPath />
            <TableHeader {...args} {...VARIANT_OBJECT[key][1]} />
          </Fragment>
        )
      )}
    </VariantsContainer>
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
