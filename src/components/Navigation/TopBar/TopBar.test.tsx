import React from 'react';

import { car } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import { EnvironmentType } from './TopBar';
import TopBar from '.';

test('Shows progress indicator only when isFetching={true}', () => {
  const { rerender } = render(
    <TopBar
      applicationIcon={car}
      applicationName="Car-go 🏎"
      onHeaderClick={() => console.log('Going home 🏡')}
      isFetching={true}
    >
      content
    </TopBar>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  rerender(
    <TopBar
      applicationIcon={car}
      applicationName="Car-go 🏎"
      onHeaderClick={() => console.log('Going home 🏡')}
      isFetching={false}
    >
      content
    </TopBar>
  );

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('Shows correct application name', () => {
  const appName = 'Car-go 🏎';
  render(
    <TopBar
      applicationIcon={car}
      applicationName={appName}
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      content
    </TopBar>
  );
  expect(screen.getByText(new RegExp(appName, 'i'))).toBeInTheDocument();
});

test('Shows environment banner', () => {
  const environmentName = faker.helpers.objectValue(EnvironmentType);
  render(
    <TopBar
      applicationIcon={car}
      applicationName="test"
      onHeaderClick={() => console.log('Going home 🏡')}
      environment={environmentName}
    >
      content
    </TopBar>
  );
  expect(screen.queryByText(environmentName)).toBeInTheDocument();
});
