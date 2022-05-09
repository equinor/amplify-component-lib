import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '../../test-utils';

import FullPageSpinner from '.';
import React from 'react';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

test('renders scrim version by default', () => {
  render(<FullPageSpinner></FullPageSpinner>);

  expect(screen.getAllByRole('generic')[1].className).toContain('Scrim');
  expect(screen.getAllByRole('generic')[1]).toHaveStyle({
    backgroundColor: colors.ui.background__scrim.rgba,
  });
});

test('renders without scrim when prop is given', () => {
  render(<FullPageSpinner withoutScrim></FullPageSpinner>);

  expect(screen.getAllByRole('generic')[1]).toHaveStyle({
    backgroundColor: 'none',
  });
});

test('renders star progress as default', () => {
  render(<FullPageSpinner withoutScrim></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'StarProgress'
  );
});

test('renders circle when prop is given', () => {
  render(<FullPageSpinner withoutScrim variant="circle"></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'CircularProgress'
  );
});

test('renders dots when prop is given', () => {
  render(<FullPageSpinner withoutScrim variant="dots"></FullPageSpinner>);

  expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
    'DotProgress'
  );
});
