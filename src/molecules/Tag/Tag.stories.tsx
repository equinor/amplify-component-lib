import {
  check,
  code,
  color_palette,
  edit,
  users_circle,
  visibility,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Tag, TagProps } from './Tag';
import { capitalize } from 'src/atoms/utils';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect } from 'storybook/test';

const meta: Meta<typeof Tag> = {
  title: 'Molecules/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=17934-2585&m=dev',
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'blue',
        'green',
        'purple',
        'dark pink',
        'pink',
        'orange',
        'yellow',
        'grey',
      ],
      description: 'Default is blue',
    },
    leadingIcon: {
      control: 'select',
      options: ['color_palette', 'code', 'users_circle'],
      mapping: {
        color_palette,
        code,
        users_circle,
      },
    },
    trailingIcon: {
      control: 'select',
      options: ['check', 'visibility', 'edit'],
      mapping: {
        check,
        visibility,
        edit,
      },
    },
  },
  args: {
    color: 'purple',
    leadingIcon: color_palette,
    children: 'Designer',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {},
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children)).toBeInTheDocument();
  },
};

const AVAILABLE_COLORS: NonNullable<TagProps['color']>[] = [
  'blue',
  'green',
  'purple',
  'dark pink',
  'pink',
  'orange',
  'yellow',
  'grey',
];

export const Colors: Story = {
  args: {
    leadingIcon: undefined,
    trailingIcon: undefined,
    children: 'Developer',
  },
  render: (args) => (
    <VariantShowcase
      GenericComponent={Tag}
      otherProps={args}
      rows={AVAILABLE_COLORS.map((color) => ({
        label: capitalize(color),
        value: { color },
      }))}
    />
  ),
};

export const LeadingIcon: Story = {
  tags: ['test-only'],
  args: {
    leadingIcon: code,
    trailingIcon: undefined,
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children)).toBeInTheDocument();
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      code.svgPathData
    );
  },
};

export const TrailingIcon: Story = {
  tags: ['test-only'],
  args: {
    leadingIcon: undefined,
    trailingIcon: code,
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children)).toBeInTheDocument();
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      code.svgPathData
    );
  },
};
