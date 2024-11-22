import { MemoryRouter } from 'react-router-dom';

import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import { TopBar } from '.';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { Field } from 'src/atoms/types/Field';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

test('Shows progress indicator only when isFetching={true}', () => {
  const { rerender } = render(
    <TopBar applicationIcon="car" applicationName="Car-go 🏎" isFetching={true}>
      content
    </TopBar>,
    { wrapper: MemoryRouter }
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  rerender(
    <TopBar
      applicationIcon="car"
      applicationName="Car-go 🏎"
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
    <TopBar applicationIcon="car" applicationName={appName}>
      content
    </TopBar>,

    { wrapper: MemoryRouter }
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
      onSelectField={onSelectedField}
      currentField={currentFiled}
      showAccessITLink={true}
      availableFields={availableFields}
    >
      content
    </TopBar>,

    { wrapper: MemoryRouter }
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
    <TopBar applicationIcon="car" applicationName="test">
      content
    </TopBar>,
    { wrapper: MemoryRouter }
  );

  for (const envType of envs) {
    rerender(
      <TopBar
        applicationIcon="car"
        applicationName="test"
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
      environment={environmentName}
    >
      content
    </TopBar>,

    { wrapper: MemoryRouter }
  );
  expect(screen.queryByText(environmentName)).not.toBeInTheDocument();
});

test('Capitalize app name works as expected', () => {
  const name = faker.person.fullName();
  render(
    <TopBar applicationIcon="test" applicationName={name} capitalize>
      content
    </TopBar>,
    { wrapper: MemoryRouter }
  );
  expect(screen.getByText(name.toLowerCase())).toBeInTheDocument();
});

test('close on resize ', async () => {
  const name = faker.person.fullName();
  const setAllAsRead = vi.fn();
  render(
    <TopBar applicationIcon="test" applicationName={name}>
      <TopBar.Notifications setAllAsRead={setAllAsRead} />
    </TopBar>,
    { wrapper: MemoryRouter }
  );
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');

  await user.click(button);
  expect(screen.getByTestId('top-bar-menu')).toBeInTheDocument();

  act(() => {
    fireEvent(window, new Event('resize'));
  });

  await waitFor(
    () => expect(screen.queryByTestId('top-bar-menu')).not.toBeInTheDocument(),
    {
      timeout: 2000,
    }
  );
});

test('Tab navigation should focus actions in expected order', async () => {
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
  const currentField: Field = availableFields[0];
  const button1 = 'button1';
  const button2 = 'button2';
  const button3 = 'button3';

  render(
    <TopBar applicationIcon="car" applicationName={appName}>
      <TopBar.FieldSelector
        availableFields={availableFields}
        currentField={currentField}
        onSelect={onSelectedField}
      />
      <TopBar.Actions>
        <Button>{button1}</Button>
        <Button>{button2}</Button>
        <Button>{button3}</Button>
      </TopBar.Actions>
    </TopBar>,
    { wrapper: MemoryRouter }
  );

  const homeButton = screen.getByRole('link', { name: appName });
  const fieldSelector = screen.getByRole('button', {
    name: currentField.name ?? '',
  });
  const firstButton = screen.getByRole('button', { name: button1 });
  const secondButton = screen.getByRole('button', { name: button2 });
  const thirdButton = screen.getByRole('button', { name: button3 });

  const user = userEvent.setup();
  await user.tab();

  expect(homeButton).toHaveFocus();
  expect(fieldSelector).not.toHaveFocus();
  expect(firstButton).not.toHaveFocus();
  expect(secondButton).not.toHaveFocus();
  expect(thirdButton).not.toHaveFocus();

  await user.tab();

  expect(homeButton).not.toHaveFocus();
  expect(fieldSelector).toHaveFocus();
  expect(firstButton).not.toHaveFocus();
  expect(secondButton).not.toHaveFocus();
  expect(thirdButton).not.toHaveFocus();

  await user.tab();

  expect(homeButton).not.toHaveFocus();
  expect(fieldSelector).not.toHaveFocus();
  expect(firstButton).toHaveFocus();
  expect(secondButton).not.toHaveFocus();
  expect(thirdButton).not.toHaveFocus();

  await user.tab();

  expect(homeButton).not.toHaveFocus();
  expect(fieldSelector).not.toHaveFocus();
  expect(firstButton).not.toHaveFocus();
  expect(secondButton).toHaveFocus();
  expect(thirdButton).not.toHaveFocus();

  await user.tab();

  expect(homeButton).not.toHaveFocus();
  expect(fieldSelector).not.toHaveFocus();
  expect(firstButton).not.toHaveFocus();
  expect(secondButton).not.toHaveFocus();
  expect(thirdButton).toHaveFocus();

  await user.tab();

  expect(homeButton).not.toHaveFocus();
  expect(fieldSelector).not.toHaveFocus();
  expect(firstButton).not.toHaveFocus();
  expect(secondButton).not.toHaveFocus();
  expect(thirdButton).not.toHaveFocus();
});
