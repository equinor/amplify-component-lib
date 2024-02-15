import React from 'react';

import { faker } from '@faker-js/faker';

import TopBar from '.';
import { render, screen, userEvent, waitFor } from 'src/tests/test-utils';
import { EnvironmentType } from 'src/types/Environment';
import { Field } from 'src/types/Field';

import { expect } from 'vitest';

test('Shows progress indicator only when isFetching={true}', () => {
  const { rerender } = render(
    <TopBar
      applicationIcon="car"
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
      applicationIcon="car"
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
      applicationIcon="car"
      applicationName={appName}
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      content
    </TopBar>
  );
  expect(screen.getByText(new RegExp(appName, 'i'))).toBeInTheDocument();
});

test('Shows fields selector instead of application name when field is send in to top bar ', () => {
  const appName = 'Car-go 🏎';
  const availableFields: Field[] = [
    {
      uuid: faker.animal.cow(),
      name: faker.animal.cetacean(),
      country: faker.animal.rodent(),
    },
    {
      uuid: faker.animal.cat(),
      name: faker.animal.crocodilia(),
      country: faker.animal.rodent(),
    },
  ];
  const onSelectedField = vi.fn();
  const currentFiled: Field = availableFields[0];

  render(
    <TopBar
      applicationIcon="car"
      applicationName={appName}
      onHeaderClick={() => console.log('Going home 🏡')}
      onSelectField={onSelectedField}
      currentField={currentFiled}
      showAccessITLink={true}
      availableFields={availableFields}
    >
      content
    </TopBar>
  );

  const button = screen.getByRole('button', { name: currentFiled.name ?? '' });
  expect(button).toBeInTheDocument();
});

test('Shows environment banner when not in production', () => {
  const envs = [
    EnvironmentType.LOCALHOST,
    EnvironmentType.DEVELOP,
    EnvironmentType.STAGING,
  ];
  const { rerender } = render(
    <TopBar
      applicationIcon="car"
      applicationName="test"
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      content
    </TopBar>
  );

  for (const envType of envs) {
    rerender(
      <TopBar
        applicationIcon="car"
        applicationName="test"
        onHeaderClick={() => console.log('Going home 🏡')}
        environment={envType}
      >
        content
      </TopBar>
    );
    expect(screen.getByText(envType)).toBeInTheDocument();
  }
});

test('Hides environment banner when in production', () => {
  const environmentName = 'production' as EnvironmentType;
  render(
    <TopBar
      applicationIcon="test"
      applicationName="test"
      onHeaderClick={() => console.log('Going home 🏡')}
      environment={environmentName}
    >
      content
    </TopBar>
  );
  expect(screen.queryByText(environmentName)).not.toBeInTheDocument();
});

test('Capitalize app name works as expected', () => {
  const name = faker.person.fullName();
  render(
    <TopBar
      applicationIcon="test"
      applicationName={name}
      capitalize
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      content
    </TopBar>
  );
  expect(screen.getByText(name.toLowerCase())).toBeInTheDocument();
});

test('close on resize ', async () => {
  const name = faker.person.fullName();
  const setAllAsRead = vi.fn();
  render(
    <TopBar
      onHeaderClick={() => console.log('Going home 🏡')}
      applicationIcon="test"
      applicationName={name}
    >
      <TopBar.Notifications setAllAsRead={setAllAsRead} />
    </TopBar>
  );
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');

  await user.click(button);
  expect(screen.getByTestId('top-bar-menu')).toBeInTheDocument();

  vi.stubGlobal(800, 600);
  global.dispatchEvent(new Event('resize'));

  await waitFor(
    () => expect(screen.queryByTestId('top-bar-menu')).not.toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );
});
