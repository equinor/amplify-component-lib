import { FC, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { checkbox, checkbox_outline } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ComboBoxChip } from '../Select.styles';
import {
  PersistentComboBox,
  PersistentComboBoxProps,
} from './PersistentComboBox';
import { spacings } from 'src/atoms';
import {
  SelectedState,
  SelectOption,
  SelectOptionRequired,
  VARIANT_OPTIONS,
} from 'src/molecules/Select/Select.types';

import { actions } from 'storybook/actions';
import { expect, userEvent, within } from 'storybook/test';
import styled from 'styled-components';

const FAKE_ITEMS = new Array(10).fill(0).map((_, index) => ({
  label: `${faker.animal.fish()} #${index + 1}`,
  value: faker.string.uuid(),
}));

const meta: Meta<typeof PersistentComboBox> = {
  title: 'Molecules/Select/PersistentComboBox',
  component: PersistentComboBox,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    meta: { control: 'text' },
    maxHeight: { control: 'text' },
    showHelperIcon: { control: 'boolean' },
    syncParentChildSelection: { control: 'boolean' },
    sortValues: { control: 'boolean' },
    clearable: { control: 'boolean' },
    variant: {
      control: 'radio',
      options: [...VARIANT_OPTIONS, undefined],
      description: 'Variants',
    },
  },
  args: {
    syncParentChildSelection: true,
    sortValues: true,
    clearable: true,
    maxHeight: undefined,
    showSelectedAsText: false,
    items: FAKE_ITEMS,
  },
};

export default meta;

interface Item {
  label: string;
  value: string;
}

const FAKE_GROUPS = new Array(faker.number.int({ min: 2, max: 4 }))
  .fill(0)
  .map((_, groupIndex) => ({
    title: `${faker.animal.lion()} Group ${groupIndex + 1}`,
    items: new Array(faker.number.int({ min: 2, max: 4 }))
      .fill(0)
      .map((_, itemIndex) => ({
        label: `${faker.animal.fish()} G${groupIndex + 1}-${itemIndex + 1}`,
        value: faker.string.uuid(),
      })),
  }));

const FAKE_ITEMS_WITH_CHILDREN = [
  {
    label: `${faker.animal.fish()} (Parent)`,
    value: faker.string.uuid(),
    children: new Array(faker.number.int({ min: 3, max: 3 }))
      .fill(0)
      .map((_, childIndex) => ({
        label: `${faker.animal.fish()} (Child ${childIndex + 1})`,
        value: faker.string.uuid(),
        children: new Array(faker.number.int({ min: 3, max: 3 }))
          .fill(0)
          .map((_, grandchildIndex) => ({
            label: `${faker.animal.fish()} (Grandchild ${childIndex + 1}.${grandchildIndex + 1})`,
            value: faker.string.uuid(),
          })),
      })),
  },
  ...new Array(5).fill(0).map((_, index) => ({
    label: `${faker.animal.fish()} #${index + 2}`,
    value: faker.string.uuid(),
  })),
];

const FAKE_ITEMS_WITH_REALLY_LONG_NAMES = new Array(
  faker.number.int({ min: 3, max: 6 })
)
  .fill(0)
  .map(() => ({
    label: `${faker.airline.airplane().name} ${faker.airline.aircraftType()} ${faker.airline.airport().name}`,
    value: faker.string.uuid(),
  }));

type Story = StoryObj<typeof PersistentComboBox>;

const PersistentComboBoxWithState = (
  args: PersistentComboBoxProps<SelectOptionRequired>
) => {
  const [values, setValues] = useState<SelectOption<Item>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<Item>[],
    selectedValue?: SelectOption<Item>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <PersistentComboBox {...args} values={values} onSelect={handleOnSelect} />
  );
};

const PersistentComboBoxWithAddState = (
  args: PersistentComboBoxProps<SelectOptionRequired>
) => {
  const [items, setItems] = useState([...FAKE_ITEMS]);

  const [values, setValues] = useState<SelectOption<Item>[]>([]);
  const handleOnSelect = (newValues: SelectOptionRequired[]) => {
    actions('onSelect').onSelect(newValues);
    setValues(newValues);
  };

  const handleOnAdd = (value: string) => {
    actions('onItemAdd').onItemAdd(value);
    const newItem = {
      label: value,
      value: faker.string.uuid(),
    };
    // NEW
    setItems((prev) => [...prev, newItem]);
    setValues((prev) => [...prev, newItem]);
  };

  return (
    <PersistentComboBox
      {...args}
      items={items}
      values={values}
      onSelect={handleOnSelect}
      groups={undefined}
      onAddItem={handleOnAdd}
    />
  );
};

export const BasicPersistentComboBox: Story = {
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const itemsToVerify = [FAKE_ITEMS[0], FAKE_ITEMS[1], FAKE_ITEMS[2]];

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    );

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[1].label })
    );

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skeletonItems = canvas.getAllByTestId('select-item-skeleton');

    await expect(skeletonItems).toHaveLength(3);

    const menuItems = canvas.queryAllByRole('button');

    const actualMenuItems = menuItems.filter((btn) =>
      FAKE_ITEMS.some((item) => btn.textContent?.includes(item.label))
    );
    await expect(actualMenuItems.length).toBe(0);
  },
};

export const SmallParent: Story = {
  render: (args) => (
    <div
      style={{
        height: '500px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');
    const itemsToVerify = [FAKE_ITEMS[0], FAKE_ITEMS[1], FAKE_ITEMS[2]];

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    const searchTerm = FAKE_ITEMS[0].label.substring(
      0,
      Math.min(5, FAKE_ITEMS[0].label.length)
    );
    await userEvent.type(searchBox, searchTerm);

    const firstMenuItem = canvas.getByRole('button', {
      name: FAKE_ITEMS[0].label,
    });
    await expect(firstMenuItem).toBeInTheDocument();

    await userEvent.clear(searchBox);

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const LargeParent: Story = {
  render: (args) => (
    <div
      style={{
        height: '1000px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
};

export const MaxHeight: Story = {
  args: {
    maxHeight: '200px',
  },
  render: (args) => (
    <div
      style={{
        height: '1000px',
        padding: spacings.large,
        backgroundColor: 'lightcyan',
      }}
    >
      <PersistentComboBoxWithState {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const itemsToVerify = [FAKE_ITEMS[0], FAKE_ITEMS[1], FAKE_ITEMS[2]];

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    );

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const ReallyLongName: Story = {
  args: {
    items: FAKE_ITEMS_WITH_REALLY_LONG_NAMES,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const LabelsAndHelperText: Story = {
  args: {
    label: 'Label here',
    helperText: 'helper text',
    meta: 'Meta label here',
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const Groups: Story = {
  args: {
    groups: FAKE_GROUPS,
    items: undefined,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const allGroupItems = FAKE_GROUPS.flatMap((g) => g.items);
    const itemsToVerify = allGroupItems.slice(0, 3); // First 3 items from groups

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    await userEvent.click(
      canvas.getByRole('button', { name: allGroupItems[0].label })
    );

    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const Parented: Story = {
  args: {
    items: FAKE_ITEMS_WITH_CHILDREN,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const parentItem = FAKE_ITEMS_WITH_CHILDREN.find(
      (item) => 'children' in item
    );
    if (!parentItem)
      throw new Error('No parent item with children found in test data');
    const firstChild = parentItem?.children[0];

    const parentMenuItem = canvas.getByRole('button', {
      name: parentItem.label,
    });
    await expect(parentMenuItem).toBeInTheDocument();

    expect(
      canvas.queryByRole('button', { name: firstChild.label })
    ).not.toBeInTheDocument();

    const toggleButtons = canvas.getAllByTestId('toggle-button');
    await userEvent.click(toggleButtons[0]);

    const childMenuItem = canvas.getByRole('button', {
      name: firstChild.label,
    });
    await expect(childMenuItem).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('button', { name: firstChild.label })
    );

    await expect(
      canvas.getByRole('button', { name: parentItem.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: firstChild.label })
    ).toBeInTheDocument();
  },
};

export const AddFunctionality: Story = {
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    await expect(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    ).toBeInTheDocument();

    const newItemText = 'New Fish Item';
    await userEvent.type(searchBox, newItemText);

    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    const addButton = canvas.getByRole('button', {
      name: `Add "${newItemText}" as new tag`,
    });
    await expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);

    await userEvent.clear(searchBox);

    await expect(
      canvas.getByRole('button', { name: newItemText })
    ).toBeInTheDocument();

    const anotherItemText = 'Another Fish';
    await userEvent.type(searchBox, anotherItemText);

    await userEvent.keyboard('{Enter}');

    await userEvent.clear(searchBox);

    await expect(
      canvas.getByRole('button', { name: anotherItemText })
    ).toBeInTheDocument();

    await expect(
      canvas.getByRole('button', { name: newItemText })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    ).toBeInTheDocument();
  },
};

export const SelectedValuesAsText: Story = {
  args: { showSelectedAsText: true },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const CustomSelectedValuesAsTextFunction: Story = {
  args: {
    showSelectedAsText: ({ selectedAmount, totalAmount }) =>
      `${selectedAmount} of ${totalAmount} fishes selected`,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

const Dot = styled.div`
  background: red;
  border-radius: 50%;
  width: 4px;
  height: 4px;
`;

const CustomValueElement: FC<{
  item: SelectOption<Item>;
  onDelete: () => void;
  tryingToRemove: boolean;
}> = ({ item, onDelete, tryingToRemove }) => (
  <ComboBoxChip
    className="amplify-combo-box-chip"
    onDelete={onDelete}
    $tryingToRemove={tryingToRemove}
  >
    <Dot />
    {item.label}
  </ComboBoxChip>
);

export const CustomValueElements: Story = {
  args: {
    customValueComponent: CustomValueElement,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

const CustomMenuItem: FC<{
  item: SelectOption<Item>;
  selectedState: SelectedState;
}> = ({ item, selectedState }) => (
  <>
    <Icon data={selectedState === 'selected' ? checkbox : checkbox_outline} />
    <Dot />
    {item.label}
  </>
);

export const CustomizableMenuItem: Story = {
  args: {
    CustomMenuItemComponent: CustomMenuItem,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const NoItemsFound: Story = {
  tags: ['test-only'],
  args: {
    items: [],
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('No items found')).toBeInTheDocument();

    const searchBox = canvas.getByRole('combobox');
    await expect(searchBox).toBeInTheDocument();

    await userEvent.type(searchBox, 'test search');
    await expect(canvas.getByText('No items found')).toBeInTheDocument();
  },
};

export const NoItemsFoundWithGroups: Story = {
  tags: ['test-only'],
  args: {
    groups: [],
    items: undefined,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('No items found')).toBeInTheDocument();

    const searchBox = canvas.getByRole('combobox');
    await expect(searchBox).toBeInTheDocument();

    await userEvent.type(searchBox, 'test search');
    await expect(canvas.getByText('No items found')).toBeInTheDocument();
  },
};

export const AddItemWithExactMatch: Story = {
  tags: ['test-only'],
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    const exactItemLabel = FAKE_ITEMS[0].label;

    // Type the EXACT label of an existing item (case-insensitive match)
    await userEvent.type(searchBox, exactItemLabel);

    await expect(canvas.queryByText('Add tag')).not.toBeInTheDocument();

    await expect(
      canvas.getByRole('button', { name: exactItemLabel })
    ).toBeInTheDocument();

    await userEvent.clear(searchBox);

    // Now type a partial match that will result in exactly 1 filtered item
    // but doesn't match it exactly
    const partialMatch = exactItemLabel.substring(0, exactItemLabel.length - 2);
    await userEvent.type(searchBox, partialMatch);

    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    await userEvent.clear(searchBox);

    // Type something that doesn't match any items
    await userEvent.type(searchBox, 'NonExistentFishSpecies123');

    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    await userEvent.clear(searchBox);

    // Type a search that matches multiple items (e.g., just first few chars)
    const multiMatch = FAKE_ITEMS[0].label.substring(0, 3);
    await userEvent.type(searchBox, multiMatch);

    await expect(canvas.getByText('Add tag')).toBeInTheDocument();
  },
};

export const AddItemWithCustomSingularWord: Story = {
  tags: ['test-only'],
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    // Type a search term that will trigger the add item UI
    const searchTerm = 'NewCustomItem';
    await userEvent.type(searchBox, searchTerm);

    await expect(canvas.getByText('Add species')).toBeInTheDocument();
    await expect(
      canvas.getByText('Species search results')
    ).toBeInTheDocument();

    const addButton = canvas.getByRole('button', {
      name: `Add "${searchTerm}" as new species`,
    });
    await expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);

    await userEvent.clear(searchBox);

    await expect(
      canvas.getByRole('button', { name: searchTerm })
    ).toBeInTheDocument();
  },
  args: {
    itemSingularWord: 'species',
  },
};
