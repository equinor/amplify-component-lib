import {
  boat,
  bus,
  cake,
  car,
  check,
  flight,
  subway,
  taxi,
  train,
  tram,
} from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import {
  IconCellColors,
  IconCellStates,
  IconCellTypes,
} from './IconCell.types';
import { colors } from 'src/atoms/style';
import { IconCell, IconCellProps } from 'src/molecules/IconCell/IconCell';
import { ThemeProviderContext } from 'src/providers/ThemeProvider/ThemeProvider';

import { useGlobals } from 'storybook/internal/preview-api';
import styled from 'styled-components';

const meta: Meta<typeof IconCell> = {
  title: 'Molecules/IconCell',
  component: IconCell,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=4202-107640&m=dev',
    },
  },
  args: {},
  decorators: [
    (Story) => {
      const [globals] = useGlobals();

      return (
        <ThemeProviderContext
          value={{ theme: globals.themeToggle, setTheme: () => {} }}
        >
          <Story />
        </ThemeProviderContext>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof IconCell>;

const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Clickable: Story = {
  args: {
    icon: car,
    label: 'Car',
    helperIcon: car,
    as: 'div',
    type: IconCellTypes.COLOURED,
    onClick: () => {
      console.log('IconCell clicked');
    },
  },
};

export const Colors: StoryFn<IconCellProps> = () => (
  <ColorsContainer>
    {Object.entries(IconCellColors).map(([key, value]) => (
      <IconCell
        key={key}
        icon={cake}
        label={key}
        color={value}
        as="div"
        type={IconCellTypes.COLOURED}
        onClick={() => console.log(`${key} clicked`)}
      />
    ))}
  </ColorsContainer>
);

export const ExampleTable: StoryFn<IconCellProps> = () => (
  <table style={{ minWidth: '800px', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th></th>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
        <th>Col 4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1</td>
        <IconCell
          icon={car}
          label="Clickable Green Car"
          color={IconCellColors.GREEN}
          helperIcon={check}
          onClick={() => console.log('Car clicked')}
        />
        <IconCell
          icon={boat}
          label="Coloured Blue Boat"
          type={IconCellTypes.COLOURED}
          color={IconCellColors.BLUE}
        />
        <IconCell icon={subway} label="Selected Subway" selected />
        <IconCell
          icon={bus}
          label="Danger Coloured Bus"
          type={IconCellTypes.COLOURED}
          state={IconCellStates.DANGER}
          selected
        />
      </tr>
      <tr>
        <td>Row 2</td>
        <IconCell
          icon={train}
          label="Disabled Coloured Train"
          disabled
          type={IconCellTypes.COLOURED}
        />
        <IconCell icon={tram} label="Disabled Tram" disabled />
        <IconCell
          icon={taxi}
          label="Scribbled Taxi"
          type={IconCellTypes.SCRIBBLED_OUT}
        />
        <IconCell
          icon={flight}
          label="Warning Plane"
          state={IconCellStates.WARNING}
        />
      </tr>
    </tbody>
  </table>
);

export const JustIcon: Story = {
  args: {
    icon: car,
    as: 'div',
  },
};

export const Disabled: Story = {
  args: {
    icon: car,
    disabled: true,
    as: 'div',
  },
};

export const Selected: Story = {
  args: {
    icon: car,
    selected: true,
    as: 'div',
  },
};

const CustomComponent = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.interactive.primary__resting.rgba};
  color: ${colors.text.static_icons__primary_white.rgba};
  border-radius: 50%;
`;

export const CustomReactElement: Story = {
  args: {
    icon: <CustomComponent>2</CustomComponent>,
    as: 'div',
  },
};
