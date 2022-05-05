import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '../../test-utils';

import FullPageSpinner from '.';
import React from 'react';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

afterEach(cleanup);

describe('FullPageSpinner', () => {
  it('renders without crashing', () => {
    render(<FullPageSpinner></FullPageSpinner>);
  });

  it('renders scrim version by default', () => {
    render(<FullPageSpinner></FullPageSpinner>);

    expect(screen.getAllByRole('generic')[1].className).toContain('Scrim');
    expect(screen.getAllByRole('generic')[1]).toHaveStyle({
      backgroundColor: colors.ui.background__scrim.rgba,
    });
  });

  it('renders without scrim when prop is given', () => {
    render(<FullPageSpinner withoutScrim></FullPageSpinner>);

    expect(screen.getAllByRole('generic')[1]).toHaveStyle({
      backgroundColor: 'none',
    });
  });

  it('renders star progress as default', () => {
    render(<FullPageSpinner withoutScrim></FullPageSpinner>);

    // eslint-disable-next-line jest-dom/prefer-to-have-attribute
    expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
      'StarProgress'
    );
  });

  it('renders circle when prop is given', () => {
    render(<FullPageSpinner withoutScrim variant="circle"></FullPageSpinner>);

    // eslint-disable-next-line jest-dom/prefer-to-have-attribute
    expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
      'CircularProgress'
    );
  });

  it('renders dots when prop is given', () => {
    render(<FullPageSpinner withoutScrim variant="dots"></FullPageSpinner>);

    // eslint-disable-next-line jest-dom/prefer-to-have-attribute
    expect(screen.getByRole('progressbar').getAttribute('class')).toContain(
      'DotProgress'
    );
  });
});
