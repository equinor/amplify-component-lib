import { boat, car } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { colors } from 'src/atoms/style';
import { ListItem } from 'src/molecules/ListItem/ListItem';

import styled from 'styled-components';

const CustomComponent = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.interactive.primary__resting.rgba};
  color: ${colors.text.static_icons__primary_white.rgba};
  border-radius: 50%;
`;

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=4202-107640&m=dev',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    leadingContent: car,
    label: 'Toyota',
  },
};

export const WithBorder: Story = {
  args: {
    leadingContent: car,
    borderBottom: true,
    label: 'Suzuki',
  },
};

export const Disabled: Story = {
  args: {
    leadingContent: car,
    label: 'Nissan',
    disabled: true,
  },
};

export const Selected: Story = {
  args: {
    leadingContent: car,
    label: 'Daihatsu',
    selected: true,
  },
};

export const IsChild: Story = {
  args: {
    leadingContent: car,
    label: 'Mazda',
    isChild: true,
  },
};

export const TrailingIcon: Story = {
  args: {
    trailingContent: boat,
    label: 'Buster',
  },
};

export const CustomReactElement: Story = {
  args: {
    leadingContent: <CustomComponent>2</CustomComponent>,
    trailingContent: <CustomComponent>5</CustomComponent>,
    label: 'Golf',
  },
};
