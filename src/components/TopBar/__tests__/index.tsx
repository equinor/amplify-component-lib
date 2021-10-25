import React from 'react';
import { render, screen } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { car } from '@equinor/eds-icons';
import TopBar from '..';

test('Renders TopBar', () => {
  render(
    <TopBar
      applicationIcon={car}
      applicationName="Car-go 🏎"
      onHeaderClick={() => console.log('Going home 🏡')}
    />
  );
});

test('Shows progress indicator only when isFetching={true}', () => {
  const { rerender } = render(
    <TopBar
      applicationIcon={car}
      applicationName="Car-go 🏎"
      onHeaderClick={() => console.log('Going home 🏡')}
      isFetching={true}
    />
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  rerender(
    <TopBar
      applicationIcon={car}
      applicationName="Car-go 🏎"
      onHeaderClick={() => console.log('Going home 🏡')}
      isFetching={false}
    />
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
