import { cake, check } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { IconCell, IconCellProps } from 'src/molecules/IconCell/IconCell';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeProps(): IconCellProps {
  return {
    label: faker.food.dish(),
    icon: cake,
    onClick: vi.fn(),
  };
}

test('Renders label as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);

  expect(screen.getByText(props.label!)).toBeInTheDocument();
});

test('Renders icons as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} icon={cake} helperIcon={check} />);
  const allIcons = screen.getAllByTestId('eds-icon-path');
  expect(allIcons[0]).toHaveAttribute('d', cake.svgPathData);
  expect(allIcons[1]).toHaveAttribute('d', check.svgPathData);
});

test('Renders custom content as expected', () => {
  const props = fakeProps();
  const trailingText = 'trailing';
  const leadingText = 'leading';

  render(
    <IconCell
      {...props}
      helperIcon={<div>{trailingText}</div>}
      icon={<div>{leadingText}</div>}
    />
  );

  expect(screen.getByText(trailingText)).toBeInTheDocument();
  expect(screen.getByText(leadingText)).toBeInTheDocument();
});

test('renders icon to left of label', () => {
  const props = fakeProps();
  render(<IconCell {...props} icon={cake} />);

  const trailingLabel = screen.getByText(props.label!);
  const precedingSvg = screen.getByTestId('eds-icon-path')
    .parentElement as Node;

  const leadingResult = trailingLabel.compareDocumentPosition(precedingSvg);

  expect(leadingResult).toBe(Node.DOCUMENT_POSITION_PRECEDING);
});

test('renders helperIcon to right of label', () => {
  const props = fakeProps();
  render(<IconCell {...props} helperIcon={cake} />);

  const precedingLabel = screen.getByText(props.label!);
  const trailingSvg = screen.getByTestId('eds-icon-path').parentElement as Node;

  const trailingResult = precedingLabel.compareDocumentPosition(trailingSvg);

  expect(trailingResult).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test('Clicking calls onClick', async () => {
  const props = fakeProps();

  render(<IconCell {...props} />);

  const user = userEvent.setup();

  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

  await user.click(container);

  expect(props.onClick).toHaveBeenCalledOnce();
});

test('OnFocus / OnBlur works', async () => {
  const props = fakeProps();
  const onFocus = vi.fn();
  const onBlur = vi.fn();
  render(<IconCell {...props} onFocus={onFocus} onBlur={onBlur} />);

  const user = userEvent.setup();

  await user.tab();

  expect(onFocus).toHaveBeenCalledOnce();

  await user.tab();

  expect(onBlur).toHaveBeenCalledOnce();
});
