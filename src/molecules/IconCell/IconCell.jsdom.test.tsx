import { cake } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { colors } from 'src/atoms/style';
import { IconCell, IconCellProps } from 'src/molecules/IconCell/IconCell';
import { render, screen } from 'src/tests/jsdomtest-utils';

function fakeProps(): IconCellProps {
  return {
    label: faker.food.dish(),
    icon: cake,
    onClick: vi.fn(),
  };
}
test('Renders focus color as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

  expect(container).toHaveStyleRule(
    'outline',
    `1px dashed ${colors.interactive.primary__resting.rgba}`,
    { modifier: ':focus:not(:disabled)' }
  );
});

test('Renders border bottom as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

  expect(container).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
});

test('Renders colors as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

  expect(container).toHaveStyle('background: transparent');

  expect(container).toHaveStyleRule(
    'background',
    colors.interactive.primary__hover_alt.rgba,
    { modifier: ':hover:not(:disabled)' }
  );
});

test('Renders selected color as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} selected />);
  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

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
  render(<IconCell {...props} />);
  const container = screen.getByText(props.label!).parentElement!
    .parentElement!;

  expect(container).toHaveStyleRule('background', 'transparent', {
    modifier: ':disabled',
  });
  expect(container).toHaveStyleRule('cursor', 'not-allowed', {
    modifier: ':disabled',
  });
});
