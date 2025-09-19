import { cake } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import {
  IconCellColors,
  IconCellStates,
  IconCellVariants,
} from './IconCell.types';
import { colors } from 'src/atoms/style';
import {
  IconCell,
  RegularIconCellProps,
} from 'src/molecules/IconCell/IconCell';
import { render, screen } from 'src/tests/jsdomtest-utils';

function fakeProps(): RegularIconCellProps {
  return {
    label: faker.food.dish(),
    icon: cake,
    as: 'div',
  };
}

test('Renders border bottom as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
});

test('Renders background color as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyle('background: transparent');
});

test('Renders background color on coloured type as expected', () => {
  const props = fakeProps();
  render(
    <IconCell
      {...props}
      variant={IconCellVariants.COLOURED}
      color={IconCellColors.GREEN}
    />
  );
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyle(`background: ${colors.ui.background__default.rgba}`);
});

test('Renders background color on coloured type with color set as expected', () => {
  const props = fakeProps();
  render(
    <IconCell
      {...props}
      variant={IconCellVariants.COLOURED}
      color={IconCellColors.GREEN}
    />
  );
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyle(
    `background: ${colors.interactive.success__highlight.rgba}`
  );
});

test('Renders selected border as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} selected />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyleRule(
    'border',
    `1px solid ${colors.text.static_icons__default.rgba}`
  );
});

test('Renders selected border on warning state as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} selected state={IconCellStates.WARNING} />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyleRule(
    'border',
    `1px solid ${colors.interactive.warning__resting.rgba}`
  );
});

test.each([
  [IconCellStates.WARNING, colors.ui.background__warning.rgba],
  [IconCellStates.ERROR, colors.ui.background__danger.rgba],
])(
  'Renders background color on %s state as expected',
  (state, expectedColor) => {
    const props = fakeProps();
    render(
      <IconCell {...props} variant={IconCellVariants.COLOURED} state={state} />
    );
    const cell = screen.getByRole('button');
    expect(cell).toHaveStyle(`background: ${expectedColor}`);
  }
);

test('Renders disabled color as expected', () => {
  const props = fakeProps();
  render(<IconCell {...props} />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyleRule('background', 'transparent', {
    modifier: ':disabled',
  });
  expect(cell).toHaveStyleRule('cursor', 'not-allowed', {
    modifier: ':disabled',
  });
});

test('Renders disabled color overriding state and color props as expected', () => {
  const props = fakeProps();
  render(
    <IconCell
      {...props}
      disabled
      state={IconCellStates.WARNING}
      color={IconCellColors.GREEN}
    />
  );
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyle(`background: transparent`);
  expect(cell).toHaveStyle(
    `border: 1px solid ${colors.ui.background__light.rgba}`
  );
});

test('Renders scribbled out as expected', () => {
  render(<IconCell variant={IconCellVariants.SCRIBBLED_OUT} />);
  const cell = screen.getByRole('button');

  expect(cell).toHaveStyle(`border: none`);
  expect(cell).toHaveStyle(
    `background: repeating-linear-gradient( 20deg, ${colors.ui.background__light_medium.rgba} 0px, ${colors.ui.background__default.rgba} 1px, ${colors.ui.background__default.rgba} 10px, ${colors.ui.background__light_medium.rgba} 11px, ${colors.ui.background__light_medium.rgba} 12px )`
  );
});
