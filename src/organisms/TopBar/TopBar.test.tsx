import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import { TopBar } from '.';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { Field } from 'src/atoms/types/Field';
import {
  act,
  renderWithRouter,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

test('Shows progress indicator only when isFetching={true}', async () => {
  await renderWithRouter(
    <TopBar applicationIcon="car" applicationName="Car-go 🏎" isFetching={true}>
      content
    </TopBar>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Shows correct application name', async () => {
  const appName = 'Car-go 🏎';
  await renderWithRouter(
    <TopBar applicationIcon="car" applicationName={appName}>
      content
    </TopBar>
  );
  expect(screen.getByText(new RegExp(appName, 'i'))).toBeInTheDocument();
});

test('Shows fields selector instead of application name when field is send in to top bar ', async () => {
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

  await renderWithRouter(
    <TopBar
      applicationIcon="car"
      applicationName={appName}
      onSelectField={onSelectedField}
      currentField={currentField}
      showAccessITLink={true}
      availableFields={availableFields}
    >
      content
    </TopBar>
  );

  const button = screen.getByRole('button', { name: currentField.name ?? '' });
  expect(button).toBeInTheDocument();
});

test.each([
  EnvironmentType.LOCALHOST,
  EnvironmentType.DEVELOP,
  EnvironmentType.STAGING,
])('Shows environment banner when in %s environment', async (env) => {
  await renderWithRouter(
    <TopBar applicationIcon="car" applicationName="test" environment={env}>
      content
    </TopBar>
  );

  expect(screen.getByText(env)).toBeInTheDocument();
});

test('Hides environment banner when in production', async () => {
  const environmentName = 'production' as EnvironmentType;
  await renderWithRouter(
    <TopBar
      applicationIcon="test"
      applicationName="test"
      environment={environmentName}
    >
      content
    </TopBar>
  );
  expect(screen.queryByText(environmentName)).not.toBeInTheDocument();
});

test('Capitalize app name works as expected', async () => {
  const name = faker.person.fullName();
  await renderWithRouter(
    <TopBar applicationIcon="test" applicationName={name} capitalize>
      content
    </TopBar>
  );
  expect(screen.getByText(name.toLowerCase())).toBeInTheDocument();
});

test('close on resize ', async () => {
  const name = faker.person.fullName();
  const setAllAsRead = vi.fn();
  await renderWithRouter(
    <TopBar applicationIcon="test" applicationName={name}>
      <TopBar.Notifications setAllAsRead={setAllAsRead} />
    </TopBar>
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

  await renderWithRouter(
    <TopBar
      applicationIcon="car"
      applicationName={appName}
      currentField={currentField}
      availableFields={availableFields}
      onSelectField={onSelectedField}
    >
      <TopBar.Actions>
        <Button>{button1}</Button>
        <Button>{button2}</Button>
        <Button>{button3}</Button>
      </TopBar.Actions>
    </TopBar>
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
