import { car, timer } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { ListItem, ListItemProps } from 'src/molecules/ListItem/ListItem';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeProps(): ListItemProps {
  return {
    label: faker.animal.dog(),
    onClick: vi.fn(),
  };
}

test('Renders label as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);

  expect(screen.getByText(props.label)).toBeInTheDocument();
});

test('Renders icons as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} leadingContent={car} trailingContent={timer} />);
  const allIcons = screen.getAllByTestId('eds-icon-path');
  expect(allIcons[0]).toHaveAttribute('d', car.svgPathData);
  expect(allIcons[1]).toHaveAttribute('d', timer.svgPathData);
});

test('Renders custom content as expected', () => {
  const props = fakeProps();
  const trailingText = 'trailing';
  const leadingText = 'leading';

  render(
    <ListItem
      {...props}
      trailingContent={<div>{trailingText}</div>}
      leadingContent={<div>{leadingText}</div>}
    />
  );

  expect(screen.getByText(trailingText)).toBeInTheDocument();
  expect(screen.getByText(leadingText)).toBeInTheDocument();
});

test('renders leadingContent to left of label', () => {
  const props = fakeProps();
  render(<ListItem {...props} leadingContent={car} />);

  const trailingLabel = screen.getByText(props.label);
  const precedingSvg = screen.getByTestId('eds-icon-path')
    .parentElement as Node;

  const leadingResult = trailingLabel.compareDocumentPosition(precedingSvg);

  expect(leadingResult).toBe(Node.DOCUMENT_POSITION_PRECEDING);
});

test('renders trailingContent to right of label', () => {
  const props = fakeProps();
  render(<ListItem {...props} trailingContent={car} />);

  const precedingLabel = screen.getByText(props.label);
  const trailingSvg = screen.getByTestId('eds-icon-path').parentElement as Node;

  const trailingResult = precedingLabel.compareDocumentPosition(trailingSvg);

  expect(trailingResult).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test('Clicking calls onClick', async () => {
  const props = fakeProps();

  render(<ListItem {...props} />);

  const user = userEvent.setup();

  const container = screen.getByText(props.label).parentElement!.parentElement!;

  await user.click(container);

  expect(props.onClick).toHaveBeenCalledOnce();
});

test('OnFocus / OnBlur works', async () => {
  const props = fakeProps();
  const onFocus = vi.fn();
  const onBlur = vi.fn();
  render(<ListItem {...props} onFocus={onFocus} onBlur={onBlur} />);

  const user = userEvent.setup();

  await user.tab();

  expect(onFocus).toHaveBeenCalledOnce();

  await user.tab();

  expect(onBlur).toHaveBeenCalledOnce();
});
