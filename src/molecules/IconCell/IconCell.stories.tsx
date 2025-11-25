import { Typography } from '@equinor/eds-core-react';
import { EdsDataGridProps } from '@equinor/eds-data-grid-react';
import {
  boat,
  bus,
  cake,
  car,
  check,
  coffee,
  flight,
  subway,
  train,
  tram,
} from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { StoryBookData, storyBookData } from './stories/data';
import {
  IconCellColors,
  IconCellStates,
  IconCellVariants,
} from './IconCell.types';
import { useSnackbar } from 'src/atoms';
import { colors } from 'src/atoms/style';
import { IconCell, IconCellProps } from 'src/molecules/IconCell/IconCell';
import { DataGrid } from 'src/organisms';
import { ThemeProviderContext } from 'src/providers/ThemeProvider/ThemeProvider';

import { expect, fn, userEvent, within } from 'storybook/test';
import { useGlobals } from 'storybook/internal/preview-api';
import styled from 'styled-components';

const meta: Meta<typeof IconCell> = {
  title: 'Molecules/IconCell',
  component: IconCell,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?m=auto&node-id=19153-6643&t=A9K3nwdktcGwfyW6-1',
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

const BasicTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <table style={{ width: '400px', borderCollapse: 'collapse' }}>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  );
};

export const Clickable: StoryFn<IconCellProps> = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <BasicTable>
      <IconCell
        icon={cake}
        label="Cake"
        helperIcon={cake}
        variant={IconCellVariants.DEFAULT}
        onClick={() => showSnackbar('Cake clicked')}
      />
      <IconCell
        icon={coffee}
        label="Coffee"
        helperIcon={coffee}
        variant={IconCellVariants.COLOURED}
        onClick={() => showSnackbar('Coffee clicked')}
      />
    </BasicTable>
  );
};

export const Disabled: StoryFn<IconCellProps> = () => {
  return (
    <BasicTable>
      <IconCell icon={cake} label="Disabled Cake" disabled />
      <IconCell
        icon={coffee}
        label="Disabled Coffee"
        variant={IconCellVariants.COLOURED}
        disabled
      />
    </BasicTable>
  );
};

export const Selected: StoryFn<IconCellProps> = () => {
  return (
    <BasicTable>
      <IconCell icon={cake} label="Selected Cake" selected />
      <IconCell
        icon={coffee}
        label="Selected Coffee"
        variant={IconCellVariants.COLOURED}
        selected
      />
    </BasicTable>
  );
};

export const ScribbledOut: StoryFn<IconCellProps> = () => {
  return (
    <BasicTable>
      <IconCell variant={IconCellVariants.SCRIBBLED_OUT} />
      <IconCell variant={IconCellVariants.SCRIBBLED_OUT} />
    </BasicTable>
  );
};

const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Colors: StoryFn<IconCellProps> = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <>
      <ColorsContainer>
        {Object.entries(IconCellColors).map(([key, value]) => (
          <IconCell
            key={key}
            icon={cake}
            label={key}
            color={value}
            as="div"
            variant={IconCellVariants.COLOURED}
            onClick={() => showSnackbar(`${key} clicked`)}
          />
        ))}
      </ColorsContainer>
      <ColorsContainer>
        {Object.entries(IconCellColors).map(([key, value]) => (
          <IconCell
            key={key}
            icon={cake}
            label={key}
            color={value}
            as="div"
            onClick={() => showSnackbar(`${key} clicked`)}
          />
        ))}
      </ColorsContainer>
    </>
  );
};

export const ExampleTableAndStates: StoryFn<IconCellProps> = () => {
  const { showSnackbar } = useSnackbar();

  return (
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
            onClick={() => showSnackbar('Green Car clicked')}
          />
          <IconCell
            icon={boat}
            label="Coloured Blue Boat"
            variant={IconCellVariants.COLOURED}
            color={IconCellColors.BLUE}
          />
          <IconCell icon={subway} label="Selected Subway" selected />
          <IconCell
            icon={bus}
            label="Danger Coloured Bus"
            variant={IconCellVariants.COLOURED}
            state={IconCellStates.DANGER}
            selected
            onClick={() => showSnackbar('Danger Bus clicked')}
          />
        </tr>
        <tr>
          <td>Row 2</td>
          <IconCell
            icon={train}
            label="Disabled Colored Train"
            disabled
            variant={IconCellVariants.COLOURED}
          />
          <IconCell icon={tram} label="Disabled Tram" disabled />
          <IconCell variant={IconCellVariants.SCRIBBLED_OUT} />
          <IconCell
            icon={flight}
            label="Warning Plane"
            state={IconCellStates.WARNING}
          />
        </tr>
      </tbody>
    </table>
  );
};

export const ExampleDataGrid: StoryFn<EdsDataGridProps<StoryBookData>> = () => {
  return (
    <>
      <Typography>
        This is using the{' '}
        <a href="https://storybook.eds.equinor.com/?path=/docs/@equinor/eds-data-grid-react_eds-data-grid--docs">
          EDS Data Grid
        </a>{' '}
        component
      </Typography>
      <br />
      <DataGrid
        rows={storyBookData}
        cellStyle={() => ({ padding: 0 })}
        columns={[
          {
            accessorKey: 'id',
            id: 'id',
            header: 'Id',
          },
          {
            accessorKey: 'icon',
            id: 'icon',
            header: 'IconCell',
            cell: (cell) => <IconCell {...cell.row.original.icon} as="div" />,
          },
        ]}
      />
    </>
  );
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
