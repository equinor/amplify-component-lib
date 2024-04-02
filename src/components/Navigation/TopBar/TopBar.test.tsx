import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import TopBar from '.';
import { spacings } from 'src/style';
import { render, screen, userEvent, waitFor } from 'src/tests/test-utils';
import { EnvironmentType } from 'src/types/Environment';
import { Field } from 'src/types/Field';

import { expect } from 'vitest';

const { colors } = tokens;

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
    <TopBar
      applicationIcon="car"
      applicationName={appName}
      onHeaderClick={() => console.log('Going home 🏡')}
    >
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
    </TopBar>
  );

  const homeButton = screen.getByRole('button', { name: appName });
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

test('Renders with correct styles', () => {
  const appName = 'Car-go 🏎';
  const button1 = 'button1';

  render(
    <TopBar
      applicationIcon="car"
      applicationName={appName}
      onHeaderClick={() => console.log('Going home 🏡')}
    >
      <TopBar.Actions>
        <Button>{button1}</Button>
      </TopBar.Actions>
    </TopBar>
  );

  const topBar = screen.getByRole('banner');
  const headerContainer = topBar.firstChild;
  const appIdentifier = screen.getByRole('button', { name: appName });

  expect(topBar).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
  expect(topBar).toHaveStyleRule(
    'background',
    colors.ui.background__default.rgba
  );
  expect(topBar).toHaveStyleRule('padding-top', `8px`);
  expect(topBar).toHaveStyleRule('padding-right', `24px`);
  expect(topBar).toHaveStyleRule('padding-bottom', `8px`);
  expect(topBar).toHaveStyleRule('padding-left', '10px');
  expect(topBar).toHaveStyleRule('align-items', 'center');
  expect(topBar).toHaveStyleRule('height', '64px');

  expect(headerContainer).toHaveStyleRule('gap', spacings.medium);

  expect(appIdentifier).toHaveStyleRule('display', 'flex');
  expect(appIdentifier).toHaveStyleRule('align-items', 'center');
  expect(appIdentifier).toHaveStyleRule('gap', spacings.medium_small);
  expect(appIdentifier).toHaveStyleRule(
    'outline',
    `2px dashed ${colors.interactive.primary__resting.rgba}`,
    { modifier: ':focus' }
  );
});
