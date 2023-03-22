import React from 'react';

import { edit } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../tests/test-utils';
import DataCard from './DataCard';

function fakeProps() {
  return {
    title: faker.company.name(),
    headerText: faker.animal.bird(),
  };
}

test('renders datatype discipline and type correctly', () => {
  const props = fakeProps();
  const { getByText } = render(<DataCard {...props} />);

  expect(getByText(props.title)).toBeInTheDocument();
  expect(getByText(props.headerText)).toBeInTheDocument();
});

test('renders right side header element and body when given', () => {
  const headerTextToTest = faker.animal.crocodilia();
  const bodyTextToTest = faker.animal.rabbit();
  const props = fakeProps();
  const { getByText } = render(
    <DataCard
      {...props}
      rightElement={<p>{headerTextToTest}</p>}
      body={<p>{bodyTextToTest}</p>}
    />
  );

  expect(getByText(headerTextToTest)).toBeInTheDocument();
  expect(getByText(bodyTextToTest)).toBeInTheDocument();
});

test('Runs onClick when pressed', async () => {
  const callback = vi.fn();
  const props = fakeProps();
  render(<DataCard {...props} onClick={callback} />);
  const user = userEvent.setup();

  await user.click(screen.getByTestId('dataCard'));

  expect(callback).toHaveBeenCalled();
});

test('Throws error when providing rightIcon and rightElement', () => {
  console.error = vi.fn();
  const props = fakeProps();
  expect(() =>
    render(
      <DataCard {...props} rightIcon={edit} rightElement={<div>test</div>} />
    )
  ).toThrow('Only use one; rightIcon or rightElement');
});

test('Runs onContextMenu when provided', async () => {
  const callback = vi.fn();
  const props = fakeProps();
  render(<DataCard {...props} onContextMenu={callback} />);
  const user = userEvent.setup();

  const card = screen.getByTestId('dataCard');
  await user.pointer([{ target: card, keys: '[MouseRight]' }]);

  expect(callback).toHaveBeenCalled();
});

test('Shows right icon when provided', () => {
  const props = fakeProps();
  render(<DataCard {...props} rightIcon={edit} />);

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    edit.svgPathData
  );
});

test('Shows tooltip when hovering', async () => {
  const props = fakeProps();
  const { container } = render(<DataCard {...props} tooltipOnTitle={true} />);
  const user = userEvent.setup();
  const title = screen.getByText(props.title);

  await user.hover(title);

  const tooltipContainer = container.parentElement?.children[1];

  expect(tooltipContainer).toBeInTheDocument();
});
