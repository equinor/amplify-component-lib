import { Icon } from '@equinor/eds-core-react';
import { car } from '@equinor/eds-icons';

import {
  IconCellColors,
  IconCellStates,
  IconCellVariants,
} from './IconCell.types';
import { colors, Theme } from 'src/atoms';
import {
  getBackground,
  getBorderBottom,
  getIconCellColor,
  getSelectedBorder,
  renderContent,
} from 'src/molecules/IconCell/IconCell.utils';

test('renderContent as string', () => {
  const color = colors.dataviz.darkgreen.default;
  const returnValue = renderContent('content', color);

  expect(returnValue).toBe('content');
});

test('renderContent as icon', () => {
  const color = colors.dataviz.darkgreen.default;
  const returnValue = renderContent(car, color);

  expect(typeof returnValue).toBe(typeof Icon);
});

const allColors = Object.values(IconCellColors);
const defaultLight = getIconCellColor(IconCellColors.LIGHTGREY, Theme.LIGHT);
const defaultDark = getIconCellColor(IconCellColors.LIGHTGREY, Theme.DARK);

test.each(allColors)(
  'getIconCellColor returns values different than the default for %s in LIGHT theme',
  async (color) => {
    const result = getIconCellColor(color, Theme.LIGHT);

    expect(result).toHaveProperty('backgroundColor');
    expect(result).toHaveProperty('iconColor');

    if (color === IconCellColors.LIGHTGREY) {
      expect(result).toEqual(defaultLight);
    } else {
      expect(result).not.toEqual(defaultLight);
    }
  }
);

test.each(allColors)(
  'getIconCellColor returns values different than the default for %s in DARK theme',
  async (color) => {
    const result = getIconCellColor(color, Theme.DARK);

    expect(result).toHaveProperty('backgroundColor');
    expect(result).toHaveProperty('iconColor');

    if (color === IconCellColors.LIGHTGREY) {
      expect(result).toEqual(defaultDark);
    } else {
      expect(result).not.toEqual(defaultDark);
    }
  }
);

test('getBorderBottom returns backgroundColor when noBottomBorder is true', () => {
  const result = getBorderBottom({
    $noBottomBorder: true,
    $backgroundColor: 'blue',
    $variant: IconCellVariants.DEFAULT,
  });

  expect(result).toBe('1px solid blue');
});

test.each([
  [IconCellStates.DANGER, colors.interactive.danger__resting.rgba],
  [IconCellStates.WARNING, colors.interactive.warning__resting.rgba],
])(
  'getBorderBottom returns state color when state is %s',
  (state, expectedColor) => {
    const result = getBorderBottom({
      $noBottomBorder: false,
      $state: state,
      $backgroundColor: 'red',
      $variant: IconCellVariants.DEFAULT,
    });

    expect(result).toBe(`1px solid ${expectedColor}`);
  }
);

test('getSelectedBorder returns warning color', () => {
  const result = getSelectedBorder(IconCellStates.WARNING);

  expect(result).toBe(colors.interactive.warning__resting.rgba);
});

test('getSelectedBorder returns fallback color when state is undefined', () => {
  const result = getSelectedBorder();

  expect(result).toBe(colors.text.static_icons__default.rgba);
});

test('getBackground returns scribbled pattern for SCRIBBLED_OUT', () => {
  const result = getBackground({ $variant: IconCellVariants.SCRIBBLED_OUT });

  expect(result).toContain('repeating-linear-gradient');
});

test('getBackground returns transparent for non-COLOURED variant', () => {
  const result = getBackground({ $variant: IconCellVariants.DEFAULT });

  expect(result).toBe('transparent');
});

test.each([
  [IconCellStates.DANGER, colors.ui.background__danger.rgba],
  [IconCellStates.WARNING, colors.ui.background__warning.rgba],
])(
  'getBackground returns correct background for %s state',
  (state, expectedColor) => {
    const result = getBackground({
      $variant: IconCellVariants.COLOURED,
      $state: state,
    });

    expect(result).toBe(expectedColor);
  }
);

test('getBackground returns provided background color when no state is given', () => {
  const result = getBackground({
    $variant: IconCellVariants.COLOURED,
    $backgroundColor: 'yellow',
  });

  expect(result).toBe('yellow');
});
