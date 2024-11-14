import { car, timer } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { colors, spacings } from 'src/atoms/style';
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

test('Renders border bottom as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} borderBottom />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
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
