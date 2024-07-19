import { car } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { spacings } from 'src/atoms/style';
import { ListItem, ListItemProps } from 'src/molecules/ListItem/ListItem';
import { render, screen, userEvent } from 'src/tests/test-utils';

const { colors } = tokens;

function fakeProps(): ListItemProps {
  return {
    icon: car,
    label: faker.animal.dog(),
    onClick: vi.fn(),
  };
}

test('Renders label as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);

  expect(screen.getByText(props.label)).toBeInTheDocument();
});

test('Renders icon as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    car.svgPathData
  );
});

test('Renders focus color as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule(
    'outline',
    `1px dashed ${colors.interactive.primary__resting.rgba}`,
    { modifier: ':focus:not(:disabled)' }
  );
});

test('Renders colors as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule('background', 'transparent');

  expect(container).toHaveStyleRule(
    'background',
    colors.interactive.primary__hover_alt.rgba,
    { modifier: ':hover:not(:disabled)' }
  );
});

test('Renders selected color as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} selected />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule(
    'background',
    colors.interactive.primary__selected_highlight.rgba
  );

  expect(container).toHaveStyleRule(
    'background',
    colors.interactive.primary__selected_hover.rgba,
    { modifier: ':hover:not(:disabled)' }
  );
});

test('Renders disabled color as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule('background', 'transparent', {
    modifier: ':disabled',
  });
  expect(container).toHaveStyleRule('cursor', 'not-allowed', {
    modifier: ':disabled',
  });
});

test('Renders icon behind when iconPosition=trailing', () => {
  const props = fakeProps();
  const { rerender } = render(<ListItem {...props} />);

  const trailingLabel = screen.getByText(props.label);
  const precedingSvg = screen.getByTestId('eds-icon-path')
    .parentElement as Node;

  const leadingResult = trailingLabel.compareDocumentPosition(precedingSvg);

  expect(leadingResult).toBe(Node.DOCUMENT_POSITION_PRECEDING);

  rerender(<ListItem {...props} iconPosition="trailing" />);

  const precedingLabel = screen.getByText(props.label);
  const trailingSvg = screen.getByTestId('eds-icon-path').parentElement as Node;

  const trailingResult = precedingLabel.compareDocumentPosition(trailingSvg);

  expect(trailingResult).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test('isChild offsets as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} isChild />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule(
    'padding',
    `${spacings.small} ${spacings.large} ${spacings.small} ${spacings.xx_large}`
  );
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
