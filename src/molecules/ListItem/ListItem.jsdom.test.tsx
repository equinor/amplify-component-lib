import { faker } from '@faker-js/faker';

import { colors, spacings } from 'src/atoms/style';
import { ListItem, ListItemProps } from 'src/molecules/ListItem/ListItem';
import { render, screen } from 'src/tests/jsdomtest-utils';

function fakeProps(): ListItemProps {
  return {
    label: faker.animal.dog(),
    onClick: vi.fn(),
  };
}
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

  expect(container).toHaveStyle('background: transparent');

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

  expect(container).toHaveStyle(
    `background: ${colors.interactive.primary__selected_highlight.rgba}`
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

test('isChild offsets as expected', () => {
  const props = fakeProps();
  render(<ListItem {...props} isChild />);
  const container = screen.getByText(props.label).parentElement!.parentElement!;

  expect(container).toHaveStyleRule(
    'padding',
    `${spacings.small} ${spacings.large} ${spacings.small} ${spacings.xx_large}`
  );
});

test('Trailing content has wrapper with margin-left: auto', () => {
  const props = fakeProps();
  render(<ListItem {...props} trailingContent={<div>trailing</div>} />);

  expect(screen.getByText('trailing').parentElement!).toHaveStyleRule(
    'margin-left',
    'auto'
  );
});
