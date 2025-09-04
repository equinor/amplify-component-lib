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

test('getIconCellColor returns green color in LIGHT theme', () => {
  const result = getIconCellColor(IconCellColors.GREEN, Theme.LIGHT);

  expect(result.backgroundColor).toBe(
    colors.interactive.success__highlight.rgba
  );
  expect(result.iconColor).toBe(colors.dataviz.darkgreen.default);
});

test('getIconCellColor returns red color in DARK theme', () => {
  const result = getIconCellColor(IconCellColors.ERROR, Theme.DARK);

  expect(result.backgroundColor).toBe(colors.ui.background__danger.rgba);
  expect(result.iconColor).toBe(colors.text.static_icons__default.rgba);
});

test('getBorderBottom returns backgroundColor when noBottomBorder is true', () => {
  const result = getBorderBottom({
    $noBottomBorder: true,
    $backgroundColor: 'blue',
    $variant: IconCellVariants.DEFAULT,
  });

  expect(result).toBe('1px solid blue');
});

test('getBorderBottom returns state color when state is DANGER', () => {
  const result = getBorderBottom({
    $noBottomBorder: false,
    $state: IconCellStates.DANGER,
    $backgroundColor: 'red',
    $variant: IconCellVariants.DEFAULT,
  });

  expect(result).toBe(`1px solid ${colors.interactive.danger__resting.rgba}`);
});

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

test('getBackground returns danger background for DANGER state', () => {
  const result = getBackground({
    $variant: IconCellVariants.COLOURED,
    $state: IconCellStates.DANGER,
  });

  expect(result).toBe(colors.ui.background__danger.rgba);
});

test('getBackground returns provided background color when no state is given', () => {
  const result = getBackground({
    $variant: IconCellVariants.COLOURED,
    $backgroundColor: 'yellow',
  });

  expect(result).toBe('yellow');
});
