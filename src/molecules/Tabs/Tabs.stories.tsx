import { FC, useState } from 'react';

import { car, gamepad, motorcycle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';
import { Tab, Tabs as TabsType } from './Tabs.types';

import { PartialStoryFn } from 'storybook/internal/types';

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
