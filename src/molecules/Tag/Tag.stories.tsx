import {
  check,
  code,
  color_palette,
  computer,
  edit,
  users_circle,
  visibility,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { DefaultTagProps, IconTagProps, Tag, TagProps } from './Tag';
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
        'white',
        'success',
        'warning',
        'danger',
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
    iconOnly: {
      control: 'boolean',
      description: 'Use the icon tag variant, which takes icon and label props',
    },
    variant: {
      control: 'select',
      options: ['pastel', 'vibrant', 'outlined'],
      description: 'Default is pastel',
    },
    iconColor: {
      control: 'color',
      type: 'string',
    },
    textColor: {
      control: 'color',
      type: 'string',
    },
  },
  args: {
    color: 'purple',
    leadingIcon: color_palette,
    children: 'Designer',
  },
};

export default meta;
type Story = StoryObj<DefaultTagProps>;
type IconStory = StoryObj<IconTagProps>;

export const Default: Story = {
  args: {},
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
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
  'white',
  'success',
  'warning',
  'danger',
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

const AVAILABLE_VARIANTS: NonNullable<TagProps['variant']>[] = [
  'pastel',
  'vibrant',
  'outlined',
];

export const Variants: Story = {
  args: {
    leadingIcon: computer,
    trailingIcon: undefined,
    children: 'Developer',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 48 }}>
      <VariantShowcase
        GenericComponent={Tag}
        otherProps={{ ...args }}
        columns={[
          {
            label: 'Pastel',
            value: { variant: 'pastel' },
          },
          {
            label: 'Vibrant',
            value: { variant: 'vibrant' },
          },
          {
            label: 'Outlined',
            value: { variant: 'outlined' },
          },
        ]}
        rows={AVAILABLE_COLORS.map((color) => ({
          label: color,
          value: { color },
        }))}
      />
    </div>
  ),
};

export const VariantStyles: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    leadingIcon: undefined,
  },
  render: (args) => (
    <>
      {AVAILABLE_VARIANTS.map((variant) => (
        <Tag key={variant} {...args} variant={variant}>
          {variant}
        </Tag>
      ))}
    </>
  ),
  play: async ({ canvas }) => {
    const getTag = (name: string) =>
      getComputedStyle(canvas.getByText(name).parentElement!);

    await expect(getTag('pastel').outlineStyle).toBe('none');
    await expect(getTag('outlined').outlineStyle).toBe('solid');
    await expect(getTag('vibrant').outlineStyle).toBe('none');
    await expect(getTag('vibrant').backgroundColor).not.toBe(
      getTag('pastel').backgroundColor
    );
  },
};

export const CustomTextAndIconColors: Story = {
  args: {
    leadingIcon: code,
    color: 'pink',
    children: 'Developer',
    textColor: '#265c36',
    iconColor: '#33C1FF',
  },
};

export const LeadingIcon: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    leadingIcon: code,
    trailingIcon: undefined,
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      code.svgPathData
    );
  },
};

export const TrailingIcon: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    leadingIcon: undefined,
    trailingIcon: code,
  },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      code.svgPathData
    );
  },
};

export const IconOnly: IconStory = {
  args: {
    iconOnly: true,
    icon: check,
    label: 'Approved',
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

export const IconOnlyAccessibleLabel: IconStory = {
  tags: ['!dev', '!autodocs'],
  args: {
    iconOnly: true,
    icon: code,
    label: 'Developer',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Developer' })).toBeVisible();
    await expect(canvas.queryByText('Developer')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      code.svgPathData
    );
  },
};

export const ReactNodeContent: Story = {
  name: 'React node content',
  args: {
    leadingIcon: undefined,
    trailingIcon: undefined,
    children: (
      <>
        SO<sub>4</sub>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('SO')).toBeInTheDocument();
    await expect(canvas.getByText('4')).toBeInTheDocument();
  },
};
