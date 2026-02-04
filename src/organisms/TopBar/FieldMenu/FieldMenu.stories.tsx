import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from 'src/atoms';
import { TopBar } from 'src/organisms/TopBar';
import { FieldMenuProps } from 'src/organisms/TopBar/FieldMenu/FieldMenu';

import { expect, fn, userEvent } from 'storybook/test';

const fields = new Array(5).fill(0).map(() => FakeField());

function Wrapper(args: FieldMenuProps & { withField?: boolean }) {
  const [selectedField, setSelectedField] = useState<Field>(
    args.availableFields[0]
  );

  const handleOnSelectField = (field: Field) => {
    setSelectedField(field);
    args?.onSelect?.(field);
  };

  return (
    <TopBar
      availableFields={args.availableFields}
      currentField={
        args.withField === undefined || args.withField
          ? selectedField
          : undefined
      }
      showAccessITLink={args.showAccessITLink}
      onSelectField={handleOnSelectField}
      applicationIcon="acquire"
      applicationName="Acquire"
    >
      <TopBar.Account />
    </TopBar>
  );
}

const meta: Meta = {
  title: 'Organisms/TopBar/FieldMenu',
  component: (args) => <Wrapper {...args} />,
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  argTypes: {
    showAccessITLink: { control: 'boolean' },
  },
  args: {
    availableFields: fields,
    onSelect: fn(),
    showAccessITLink: true,
  },
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

function FakeField() {
  return {
    name: faker.lorem.word(),
    uuid: faker.string.uuid(),
    country: faker.location.country(),
  };
}

export const Primary: Story = {};

export const Selecting: Story = {
  args: {
    availableFields: fields,
    onSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByTestId('field-selector-top-bar-button');
    await userEvent.click(button);

    const secondItem = canvas.getByText(
      new RegExp(args.availableFields[1].name ?? '', 'i')
    );
    await userEvent.click(secondItem);

    await expect(args.onSelect).toHaveBeenCalledWith(args.availableFields[1]);
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
  },
};

export const Searching: Story = {
  args: {
    availableFields: fields,
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    const button = canvas.getByTestId('field-selector-top-bar-button');
    await userEvent.click(button);

    const searchInput = canvas.getByPlaceholderText(/search fields/i);
    await userEvent.type(searchInput, faker.animal.cat());

    await expect(canvas.getByText(/no field/i)).toBeInTheDocument();
  },
};

export const NoSearchField: Story = {
  args: {
    availableFields: [fields[0]],
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    const button = canvas.getByTestId('field-selector-top-bar-button');
    await userEvent.click(button);

    const searchInput = canvas.queryByPlaceholderText(/search fields/i);

    await expect(searchInput).not.toBeInTheDocument();
  },
};

export const WithAccessItLink: Story = {
  args: {
    availableFields: fields,
    showAccessITLink: true,
    onSelect: fn(),
  },
  play: async ({ canvas }) => {
    window.open = fn();
    const fieldButton = canvas.getByTestId('field-selector-top-bar-button');
    await userEvent.click(fieldButton);

    const button = canvas.getByTestId('access-it-link');
    await userEvent.click(button);

    await expect(window.open).toHaveBeenCalledWith(
      'https://accessit.equinor.com/#',
      '_blank'
    );
    await expect(window.open).toHaveBeenCalledTimes(1);
  },
};

export const NoField: Story = {
  args: {
    withField: false,
  },
  play: async ({ canvas }) => {
    const button = canvas.queryByTestId('field-selector-top-bar-button');

    await expect(button).not.toBeInTheDocument();
  },
};

export const OnlyOneField: Story = {
  args: {
    withField: true,
    availableFields: [fields[0]],
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByTestId('field-selector-top-bar-button');

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(canvas.getByTestId('access-it-link')).toBeInTheDocument();
    await expect(
      canvas.getByText(args.availableFields[0].name ?? '')
    ).toBeInTheDocument();
  },
};
