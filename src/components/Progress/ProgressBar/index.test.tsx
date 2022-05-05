import '@testing-library/jest-dom/extend-expect';

import ProgressBar from './index';
import React from 'react';
import { render } from '../../../test-utils';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

test('renders progress based on prop', () => {
  const { getByTestId } = render(<ProgressBar progress={25} />);
  expect(getByTestId('progressbarfill')).toHaveStyle('width: 25%');
});

test('clamps progress to a min of 0%', () => {
  const { getByTestId } = render(<ProgressBar progress={-10} />);
  expect(getByTestId('progressbarfill')).toHaveStyle('width: 0%');
});

test('clamps progress to a max of 100%', () => {
  const { getByTestId } = render(<ProgressBar progress={200} />);
  expect(getByTestId('progressbarfill')).toHaveStyle('width: 100%');
});

test('renders a number value when prop is given', () => {
  const { getByTestId } = render(
    <ProgressBar displayValue={150.8} progress={200} />
  );
  expect(getByTestId('progressbarvalue').innerHTML).toBe('150.8');
});

test('renders a number value with correct precision when prop is given', () => {
  const { getByTestId } = render(
    <ProgressBar displayValue={150.88} progress={200} />
  );
  expect(getByTestId('progressbarvalue').innerHTML).toBe('150.9');
});

test('renders the bar with correct default background', () => {
  const { getByTestId } = render(<ProgressBar progress={50} />);
  expect(getByTestId('progressbarbackground')).toHaveStyle(
    `background-color: ${colors.ui.background__light.hsla}`
  );
});

test('renders the bar with correct default fill', () => {
  const { getByTestId } = render(<ProgressBar progress={50} />);
  expect(getByTestId('progressbarfill')).toHaveStyle(
    `background-color: ${colors.infographic.substitute__blue_sky.hsla}`
  );
});

test('renders the bar with correct fill', () => {
  const { getByTestId } = render(
    <ProgressBar fillColor="blue" progress={50} />
  );
  expect(getByTestId('progressbarfill')).toHaveStyle(`background-color: blue`);
});

test('renders the bar with correct background', () => {
  const { getByTestId } = render(
    <ProgressBar backgroundColor="blue" progress={50} />
  );
  expect(getByTestId('progressbarbackground')).toHaveStyle(
    `background-color: blue`
  );
});

test('renders correct value inside the fill when props are given', () => {
  const { getByTestId } = render(
    <ProgressBar displayValue={25} progress={50} />
  );
  expect(getByTestId('progressbarvalue').innerHTML).toBe('25.0');
});

test('renders correct unit inside the fill when props are given', () => {
  const { getByTestId } = render(
    <ProgressBar
      displayValueInBar
      displayValue={25}
      valueUnit="meters"
      progress={50}
    />
  );
  expect(getByTestId('progressbarfill').firstElementChild?.innerHTML).toBe(
    '25 meters'
  );
});
