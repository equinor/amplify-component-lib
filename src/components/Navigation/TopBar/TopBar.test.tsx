import React from 'react';

import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import { EnvironmentType } from './TopBar';
import TopBar from '.';
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
  screen.logTestingPlaygroundURL();
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

test('Uses react element for icon if provided and logs error', () => {
  console.warn = vi.fn();
  const iconText = faker.animal.snake();
  render(
    <TopBar
      applicationIcon={<p>{iconText}</p>}
      applicationName="test"
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      content
    </TopBar>
  );
  expect(console.warn).toHaveBeenCalledWith(
    'Sending an element as applicationIcon is the old way of setting the icon in the top bar! Switch to just sending the name of the app as applicationIcon.'
  );
  expect(screen.getByText(iconText)).toBeInTheDocument();
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
