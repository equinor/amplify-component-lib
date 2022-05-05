import '@testing-library/jest-dom/extend-expect';

import { cleanup, render } from '../../../test-utils';

import ProgressBar from './index';
import React from 'react';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

afterEach(cleanup);

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar progress={0} />);
  });

  it('renders progress based on prop', () => {
    const { getByTestId } = render(<ProgressBar progress={25} />);
    expect(getByTestId('progressbarfill')).toHaveStyle('width: 25%');
  });

  it('clamps progress to a min of 0%', () => {
    const { getByTestId } = render(<ProgressBar progress={-10} />);
    expect(getByTestId('progressbarfill')).toHaveStyle('width: 0%');
  });

  it('clamps progress to a max of 100%', () => {
    const { getByTestId } = render(<ProgressBar progress={200} />);
    expect(getByTestId('progressbarfill')).toHaveStyle('width: 100%');
  });

  it('renders a number value when prop is given', () => {
    const { getByTestId } = render(
      <ProgressBar displayValue={150.8} progress={200} />
    );
    expect(getByTestId('progressbarvalue').innerHTML).toBe('150.8');
  });

  it('renders a number value with correct precision when prop is given', () => {
    const { getByTestId } = render(
      <ProgressBar displayValue={150.88} progress={200} />
    );
    expect(getByTestId('progressbarvalue').innerHTML).toBe('150.9');
  });

  it('renders the bar with correct default background', () => {
    const { getByTestId } = render(<ProgressBar progress={50} />);
    expect(getByTestId('progressbarbackground')).toHaveStyle(
      `background-color: ${colors.ui.background__light.hsla}`
    );
  });

  it('renders the bar with correct default fill', () => {
    const { getByTestId } = render(<ProgressBar progress={50} />);
    expect(getByTestId('progressbarfill')).toHaveStyle(
      `background-color: ${colors.infographic.substitute__blue_sky.hsla}`
    );
  });

  it('renders the bar with correct fill', () => {
    const { getByTestId } = render(
      <ProgressBar fillColor="blue" progress={50} />
    );
    expect(getByTestId('progressbarfill')).toHaveStyle(
      `background-color: blue`
    );
  });

  it('renders the bar with correct background', () => {
    const { getByTestId } = render(
      <ProgressBar backgroundColor="blue" progress={50} />
    );
    expect(getByTestId('progressbarbackground')).toHaveStyle(
      `background-color: blue`
    );
  });

  it('renders correct value inside the fill when props are given', () => {
    const { getByTestId } = render(
      <ProgressBar displayValue={25} progress={50} />
    );
    expect(getByTestId('progressbarvalue').innerHTML).toBe('25.0');
  });

  it('renders correct unit inside the fill when props are given', () => {
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
});
