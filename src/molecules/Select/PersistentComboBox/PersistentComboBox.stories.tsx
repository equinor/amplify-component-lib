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

// Custom type that extends SelectOptionRequired with additional properties
interface ExtendedItem extends SelectOptionRequired {
  id: number;
  category: string;
  metadata?: Record<string, unknown>;
}

const FAKE_EXTENDED_ITEMS: ExtendedItem[] = new Array(8)
  .fill(0)
  .map((_, index) => ({
    label: `${faker.animal.fish()} #${index + 1}`,
    value: faker.string.uuid(),
    id: index + 1,
    category: faker.helpers.arrayElement([
      'freshwater',
      'saltwater',
      'tropical',
    ]),
    metadata: {
      scientific_name: faker.science.chemicalElement().name,
      habitat: faker.location.city(),
    },
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

const PersistentComboBoxWithExtendedTypeState: FC = () => {
  const [values, setValues] = useState<SelectOption<ExtendedItem>[]>([]);

  const handleOnSelect = (
    selectedValues: SelectOption<ExtendedItem>[],
    selectedValue?: SelectOption<ExtendedItem>
  ) => {
    actions('onSelect').onSelect(selectedValues, selectedValue);
    setValues(selectedValues);
  };

  return (
    <PersistentComboBox<ExtendedItem>
      items={FAKE_EXTENDED_ITEMS}
      values={values}
      onSelect={handleOnSelect}
      sortValues
      clearable
    />
  );
};

export const BasicPersistentComboBox: Story = {
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // All items are visible immediately without opening a menu (no click needed)
    // Pick a few random items to verify they're visible
    const itemsToVerify = [FAKE_ITEMS[0], FAKE_ITEMS[1], FAKE_ITEMS[2]];

    for (const item of itemsToVerify) {
      // Query for button elements (menu items) specifically, not chips
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    // Select first item by clicking its menu item button
    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    );

    // After selection, all items stay visible (persistent behavior)
    for (const item of itemsToVerify) {
      // Query for button elements (menu items) specifically, not chips
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    // Select second item by clicking its menu item button
    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[1].label })
    );

    // After multiple selections, all items still visible
    for (const item of itemsToVerify) {
      // Query for button elements (menu items) specifically, not chips
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const PersistentComboBoxLoading: Story = {
  args: {
    loading: true,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skeletonItems = canvas.getAllByTestId('select-item-skeleton');

    await expect(skeletonItems).toHaveLength(3);

    // Actual menu items should NOT be present during loading
    const menuItems = canvas.queryAllByRole('button');

    const actualMenuItems = menuItems.filter((btn) =>
      FAKE_ITEMS.some((item) => btn.textContent?.includes(item.label))
    );
    await expect(actualMenuItems.length).toBe(0);
  },
};

export const PersistentComboBoxWithSmallParent: Story = {
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

    // All items are visible initially without opening menu
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    // Type in search box to filter
    const searchTerm = FAKE_ITEMS[0].label.substring(
      0,
      Math.min(5, FAKE_ITEMS[0].label.length)
    );
    await userEvent.type(searchBox, searchTerm);

    // Filtered items remain visible (persistent menu doesn't close during search)
    // First item should still be visible
    const firstMenuItem = canvas.getByRole('button', {
      name: FAKE_ITEMS[0].label,
    });
    await expect(firstMenuItem).toBeInTheDocument();

    // Clear search
    await userEvent.clear(searchBox);

    // All items are immediately visible again after clearing search
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const PersistentComboBoxWithLargeParent: Story = {
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

export const PersistentComboBoxWithMaxHeight: Story = {
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

    // All items are accessible even with maxHeight constraint (in DOM, scrollable)
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    // Select the first item
    await userEvent.click(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    );

    // After selection with maxHeight, items remain visible and scrollable
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const PersistentComboBoxWithReallyLongName: Story = {
  args: {
    items: FAKE_ITEMS_WITH_REALLY_LONG_NAMES,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithLabelsAndHelperText: Story = {
  args: {
    label: 'Label here',
    helperText: 'helper text',
    meta: 'Meta label here',
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithGroups: Story = {
  args: {
    groups: FAKE_GROUPS,
    items: undefined,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const allGroupItems = FAKE_GROUPS.flatMap((g) => g.items);
    const itemsToVerify = allGroupItems.slice(0, 3); // First 3 items from groups

    // All grouped items are visible immediately without opening menu
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }

    // Select first item
    await userEvent.click(
      canvas.getByRole('button', { name: allGroupItems[0].label })
    );

    // After selection, all grouped items remain visible
    for (const item of itemsToVerify) {
      const menuItem = canvas.getByRole('button', { name: item.label });
      await expect(menuItem).toBeInTheDocument();
    }
  },
};

export const PersistentComboBoxParented: Story = {
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
      // Test should always have one parent item with children
      throw new Error('No parent item with children found in test data');
    const firstChild = parentItem?.children[0];

    // Parent item should be visible as a menu item button
    const parentMenuItem = canvas.getByRole('button', {
      name: parentItem.label,
    });
    await expect(parentMenuItem).toBeInTheDocument();

    // Children should NOT be visible initially (collapsed)
    expect(
      canvas.queryByRole('button', { name: firstChild.label })
    ).not.toBeInTheDocument();

    // Find and click the toggle button to expand children
    const toggleButtons = canvas.getAllByTestId('toggle-button');
    await userEvent.click(toggleButtons[0]);

    // Expanded children become visible and remain persistently visible
    const childMenuItem = canvas.getByRole('button', {
      name: firstChild.label,
    });
    await expect(childMenuItem).toBeInTheDocument();

    // Select a child item by clicking its menu item button
    await userEvent.click(
      canvas.getByRole('button', { name: firstChild.label })
    );

    // After selecting, parent and expanded children still remain visible
    await expect(
      canvas.getByRole('button', { name: parentItem.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: firstChild.label })
    ).toBeInTheDocument();
  },
};

export const PersistentComboBoxWithAdd: Story = {
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    // All original items are visible initially in persistent mode
    await expect(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    ).toBeInTheDocument();

    // Start typing to trigger the add item UI
    const newItemText = 'New Fish Item';
    await userEvent.type(searchBox, newItemText);

    // "Add tag" section should appear persistently
    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    // The add button should be visible with the new item text
    const addButton = canvas.getByRole('button', {
      name: `Add "${newItemText}" as new tag`,
    });
    await expect(addButton).toBeInTheDocument();

    // Click the add button to add the new item
    await userEvent.click(addButton);

    // After adding, clear search to see all items
    await userEvent.clear(searchBox);

    // The newly added item should now be visible as a menu item and also as a selected chip
    await expect(
      canvas.getByRole('button', { name: newItemText })
    ).toBeInTheDocument();

    // Test adding another item with Enter key
    const anotherItemText = 'Another Fish';
    await userEvent.type(searchBox, anotherItemText);

    // Press Enter to add the item
    await userEvent.keyboard('{Enter}');

    // Clear search to see all items including the newly added one
    await userEvent.clear(searchBox);

    // The second newly added item should now be visible
    await expect(
      canvas.getByRole('button', { name: anotherItemText })
    ).toBeInTheDocument();

    // Both new items and original items remain persistently visible
    await expect(
      canvas.getByRole('button', { name: newItemText })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: FAKE_ITEMS[0].label })
    ).toBeInTheDocument();
  },
};

export const PersistentComboBoxWithSelectedValuesAsText: Story = {
  args: { showSelectedAsText: true },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxWithCustomSelectedValuesAsTextFunction: Story = {
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

export const PersistentComboBoxWithCustomValueElements: Story = {
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

export const PersistentComboBoxWithCustomizableSelectMenuItem: Story = {
  args: {
    CustomMenuItemComponent: CustomMenuItem,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
};

export const PersistentComboBoxNoItemsFound: Story = {
  args: {
    items: [],
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // "No items found" text should be visible when items array is empty
    await expect(canvas.getByText('No items found')).toBeInTheDocument();

    // Search box should still be present
    const searchBox = canvas.getByRole('combobox');
    await expect(searchBox).toBeInTheDocument();

    // Try typing in search box - should still show "No items found"
    await userEvent.type(searchBox, 'test search');
    await expect(canvas.getByText('No items found')).toBeInTheDocument();
  },
  tags: ['test-only'],
};

export const PersistentComboBoxNoItemsFoundWithGroups: Story = {
  args: {
    groups: [],
    items: undefined,
  },
  render: (args) => <PersistentComboBoxWithState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // "No items found" text should be visible when groups array is empty
    await expect(canvas.getByText('No items found')).toBeInTheDocument();

    // Search box should still be present
    const searchBox = canvas.getByRole('combobox');
    await expect(searchBox).toBeInTheDocument();

    // Try typing in search box - should still show "No items found"
    await userEvent.type(searchBox, 'test search');
    await expect(canvas.getByText('No items found')).toBeInTheDocument();
  },
  tags: ['test-only'],
};

export const PersistentComboBoxAddItemWithExactMatch: Story = {
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    // Get the first item's exact label
    const exactItemLabel = FAKE_ITEMS[0].label;

    // Type the EXACT label of an existing item (case-insensitive match)
    await userEvent.type(searchBox, exactItemLabel);

    // When search exactly matches an existing item (case-insensitive),
    // the "Add tag" section should NOT appear because there's exactly 1 filtered item
    // and its label matches the search term
    await expect(canvas.queryByText('Add tag')).not.toBeInTheDocument();

    // The matching item should be visible
    await expect(
      canvas.getByRole('button', { name: exactItemLabel })
    ).toBeInTheDocument();

    // Clear the search
    await userEvent.clear(searchBox);

    // Now type a partial match that will result in exactly 1 filtered item
    // but doesn't match it exactly
    const partialMatch = exactItemLabel.substring(0, exactItemLabel.length - 2);
    await userEvent.type(searchBox, partialMatch);

    // With a partial match (1 filtered item but search doesn't match exactly),
    // the "Add tag" section SHOULD appear
    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    // Clear again
    await userEvent.clear(searchBox);

    // Type something that doesn't match any items
    await userEvent.type(searchBox, 'NonExistentFishSpecies123');

    // With no matches (filteredItems.length !== 1), "Add tag" SHOULD appear
    await expect(canvas.getByText('Add tag')).toBeInTheDocument();

    // Clear one more time
    await userEvent.clear(searchBox);

    // Type a search that matches multiple items (e.g., just first few chars)
    const multiMatch = FAKE_ITEMS[0].label.substring(0, 3);
    await userEvent.type(searchBox, multiMatch);

    // With multiple matches (filteredItems.length !== 1), "Add tag" SHOULD appear
    await expect(canvas.getByText('Add tag')).toBeInTheDocument();
  },
  tags: ['test-only'],
};

export const PersistentComboBoxAddItemWithCustomSingularWord: Story = {
  render: (args) => <PersistentComboBoxWithAddState {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchBox = canvas.getByRole('combobox');

    // Type a search term that will trigger the add item UI
    const searchTerm = 'NewCustomItem';
    await userEvent.type(searchBox, searchTerm);

    // With itemSingularWord set to "species", the section titles should use "species"
    // instead of the default "tag"
    await expect(canvas.getByText('Add species')).toBeInTheDocument();
    await expect(
      canvas.getByText('Species search results')
    ).toBeInTheDocument();

    // The add button should also use "species"
    const addButton = canvas.getByRole('button', {
      name: `Add "${searchTerm}" as new species`,
    });
    await expect(addButton).toBeInTheDocument();

    // Click to add the item
    await userEvent.click(addButton);

    // Clear search
    await userEvent.clear(searchBox);

    // Verify the item was added
    await expect(
      canvas.getByRole('button', { name: searchTerm })
    ).toBeInTheDocument();
  },
  args: {
    itemSingularWord: 'species',
  },
  tags: ['test-only'],
};

export const PersistentComboBoxWithExtendedType: Story = {
  render: () => <PersistentComboBoxWithExtendedTypeState />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the component works with extended types (T extends SelectOptionRequired)
    const firstItem = FAKE_EXTENDED_ITEMS[0];
    const secondItem = FAKE_EXTENDED_ITEMS[1];

    // Items should be visible
    await expect(
      canvas.getByRole('button', { name: firstItem.label })
    ).toBeInTheDocument();

    // Select first item - component should handle extended type properties
    await userEvent.click(
      canvas.getByRole('button', { name: firstItem.label })
    );

    // Select second item
    await userEvent.click(
      canvas.getByRole('button', { name: secondItem.label })
    );

    // Both items should remain visible after selection
    await expect(
      canvas.getByRole('button', { name: firstItem.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: secondItem.label })
    ).toBeInTheDocument();
  },
  tags: ['test-only'],
};
