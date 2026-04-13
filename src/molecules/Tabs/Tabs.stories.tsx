import { FC, useState } from 'react';

import { car, gamepad, motorcycle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';
import { Tab, Tabs as TabsType } from './Tabs.types';
import { getVariantIcon } from 'src/atoms/utils';

import { PartialStoryFn } from 'storybook/internal/types';
import { expect, fn, userEvent, within } from 'storybook/test';

const OPTIONS: [Tab<number>, Tab<number>, Tab<number>] = [
  {
    value: 1,
    label: 'トヨタ',
  },
  {
    value: 2,
    label: 'マツダ',
  },
  {
    value: 3,
    label: '日産',
  },
];

const StoryComponent: FC<TabsType<number>> = (args) => {
  const [selected, setSelected] = useState(1);

  const handleOnChange = (value: number) => {
    setSelected(value);
  };

  return <Tabs {...args} selected={selected} onChange={handleOnChange} />;
};

const meta: Meta = {
  title: 'Molecules/Tabs',
  component: StoryComponent,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=10446-26376&m=dev',
    },
    docs: {
      source: {
        code: `<Tabs options={...} animated={boolean} centered={boolean} />`,
      },
    },
  },
  argTypes: {
    options: {
      control: { type: 'object' },
      description:
        'Array with options, option.value can be whatever you want it to be. In this example it is a number',
    },
    animated: {
      control: { type: 'boolean' },
      type: 'boolean',
      description: 'Defaults to true',
    },
    centered: {
      control: { type: 'boolean' },
      type: 'boolean',
      description: 'Defaults to true',
    },
    scrollable: {
      control: { type: 'boolean' },
      type: 'boolean',
      description: 'Defaults to true',
    },
    amountPerScrollPage: {
      control: { type: 'range', min: 1, max: 6 },
      type: 'number',
      description: 'Defaults to undefined',
    },
  },
  args: {
    options: OPTIONS,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const WideTabs = (Story: PartialStoryFn) => (
  <div style={{ width: '40rem', maxWidth: '40rem', overflow: 'hidden' }}>
    <Story />
  </div>
);

export const Default: Story = {
  args: {},
};

export const WithLeadingIcon: Story = {
  args: {
    options: [
      {
        value: 1,
        leadingIcon: car,
        label: 'トヨタ',
      },
      {
        value: 2,
        leadingIcon: gamepad,
        label: '任天堂',
      },
      {
        value: 3,
        leadingIcon: motorcycle,
        label: 'ヤマハ',
      },
    ],
  },
  play: async ({ canvas, args }) => {
    for (const item of args.options) {
      const tabElement = canvas.getByRole('tab', { name: item.label });
      const icon = within(tabElement).getByTestId('eds-icon-path');
      await expect(icon).toBeInTheDocument();
      await expect(icon).toHaveAttribute(
        'd',
        item.leadingIcon?.svgPathData as string
      );
    }
  },
};

export const WithTrailingIcon: Story = {
  args: {
    options: [
      {
        value: 1,
        trailingIcon: car,
        label: 'トヨタ',
      },
      {
        value: 2,
        trailingIcon: gamepad,
        label: '任天堂',
      },
      {
        value: 3,
        trailingIcon: motorcycle,
        label: 'ヤマハ',
      },
    ],
  },
  play: async ({ canvas, args }) => {
    for (const item of args.options) {
      const tabElement = canvas.getByRole('tab', { name: item.label });
      const icon = within(tabElement).getByTestId('eds-icon-path');
      await expect(icon).toBeInTheDocument();
      await expect(icon).toHaveAttribute(
        'd',
        item.trailingIcon?.svgPathData as string
      );
    }
  },
};

export const Variants: Story = {
  args: {
    options: [
      {
        value: 1,
        variant: 'error',
        label: 'トヨタ',
      },
      {
        value: 2,
        variant: 'warning',
        label: '任天堂',
      },
      {
        value: 3,
        leadingIcon: motorcycle,
        label: 'ヤマハ',
      },
    ],
  },
  play: async ({ canvas, args }) => {
    const errorTab = canvas.getByRole('tab', { name: args.options[0].label });
    await expect(within(errorTab).getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      getVariantIcon('error').svgPathData as string
    );

    const warningTab = canvas.getByRole('tab', { name: args.options[1].label });
    await expect(
      within(warningTab).getByTestId('eds-icon-path')
    ).toHaveAttribute('d', getVariantIcon('warning').svgPathData as string);
  },
};

export const WithCount: Story = {
  args: {
    options: [
      {
        value: 1,
        label: 'トヨタ',
        count: 5,
      },
      {
        value: 2,
        label: '任天堂',
        count: 6,
      },
      {
        value: 3,
        label: 'ヤマハ',
        count: 128,
      },
    ],
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      {
        value: 1,
        label: 'トヨタ',
      },
      {
        value: 2,
        label: 'マツダ',
        disabled: true,
      },
      {
        value: 3,
        label: '日産',
      },
    ],
  },
};

export const LongTabs: Story = {
  args: {},
  decorators: WideTabs,
};

export const LongTabsWithLeadingIcon: Story = {
  args: {
    options: [
      {
        value: 1,
        leadingIcon: car,
        label: 'トヨタ',
      },
      {
        value: 2,
        leadingIcon: gamepad,
        label: '任天堂',
      },
      {
        value: 3,
        leadingIcon: motorcycle,
        label: 'ヤマハ',
      },
    ],
  },
  decorators: WideTabs,
};

export const LeftAligned: Story = {
  args: {
    centered: false,
  },
  decorators: WideTabs,
};

export const Scrolling: Story = {
  args: {
    scrollable: true,
    options: [
      ...OPTIONS,
      {
        value: 4,
        label: 'ホンダ',
      },
      {
        value: 5,
        label: 'スバル',
      },
      {
        value: 6,
        label: '三菱',
      },
      {
        value: 7,
        label: 'スズキ',
      },
      {
        value: 8,
        label: 'ダイハツ',
      },
      {
        value: 9,
        label: 'レクサス',
      },
      {
        value: 10,
        label: 'いすゞ',
      },
      {
        value: 11,
        label: '日野',
      },
      {
        value: 12,
        label: '光岡',
      },
      {
        value: 13,
        label: 'UDトラックス',
      },
    ],
  },
  decorators: WideTabs,
};

export const ScrollingWithAmountPerPage: Story = {
  args: {
    scrollable: true,
    amountPerScrollPage: 3,
    options: [
      ...OPTIONS,
      {
        value: 4,
        label: 'ホンダ',
      },
      {
        value: 5,
        label: 'スバル',
      },
      {
        value: 6,
        label: '三菱',
      },
      {
        value: 7,
        label: 'スズキ',
      },
      {
        value: 8,
        label: 'ダイハツ',
      },
      {
        value: 9,
        label: 'レクサス',
      },
      {
        value: 10,
        label: 'いすゞ',
      },
      {
        value: 11,
        label: '日野',
      },
      {
        value: 12,
        label: '光岡',
      },
      {
        value: 13,
        label: 'UDトラックス',
      },
    ],
  },
  decorators: WideTabs,
};

export const NotAnimated: Story = {
  args: {
    animated: false,
  },
};
export const OnHover: Story = {
  tags: ['test-only'],
  args: {
    onHover: fn(),
  },
  play: async ({ canvas, args }) => {
    for (const item of args.options) {
      const tabElement = canvas.getByRole('tab', { name: item.label });
      await userEvent.hover(tabElement);
      if (args.onHover) {
        await expect(args.onHover).toHaveBeenCalledWith(item.value);
      }
    }
  },
};
