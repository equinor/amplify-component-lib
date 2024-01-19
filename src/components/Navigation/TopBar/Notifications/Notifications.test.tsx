import React from 'react';

import { notifications } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../../tests/test-utils';
import Notifications, { UnreadRedDot } from './Notifications';

const { colors } = tokens;

test('renders button and panel correctly', async () => {
  render(<Notifications setAllAsRead={() => null} />);
  const icons = screen.getAllByTestId('eds-icon-path');

  expect(icons[0]).toHaveAttribute('d', notifications.svgPathData);
  expect(screen.getByTestId('side-panel')).toHaveStyleRule('display', 'none');

  const button = screen.getByTestId('show-hide-button');
  await userEvent.click(button);
  expect(screen.getByTestId('side-panel')).toBeVisible();
});

test('renders element children correctly', async () => {
  const texts = new Array(faker.number.int({ min: 2, max: 20 }))
    .fill(0)
    .map(() => faker.string.uuid());
  render(
    <Notifications setAllAsRead={() => null}>
      {texts.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </Notifications>
  );
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');

  await user.click(button);

  for (const text of texts) {
    expect(screen.getByText(text)).toBeVisible();
  }
});

test('Calls setAllAsRead when pressing button twice', async () => {
  const setAllAsRead = vi.fn();
  render(<Notifications setAllAsRead={setAllAsRead} />);
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');

  await user.click(button);

  await user.click(button);

  expect(setAllAsRead).toHaveBeenCalledTimes(1);
});

test('Calls setAllAsRead when pressing outside of panel', async () => {
  const randomText = faker.animal.dog();
  const setAllAsRead = vi.fn();
  render(
    <div>
      <Notifications setAllAsRead={setAllAsRead} />
      <button>{randomText}</button>
    </div>
  );
  const user = userEvent.setup();

  const buttons = screen.getAllByRole('button');

  const notificationButton = buttons[0];

  await user.click(notificationButton);

  expect(screen.getByTestId('side-panel')).toBeVisible();

  const elementOutsidePanel = screen.getByText(randomText);

  await user.click(elementOutsidePanel);

  expect(screen.getByTestId('side-panel')).toHaveStyleRule('display', 'none');
});

test('Renders unread dot when unread = true', async () => {
  render(<Notifications setAllAsRead={() => null} hasUnread />);
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');
  await user.click(button);

  const unreadDot = screen.getByTestId('unread-dot');
  expect(unreadDot).toBeInTheDocument();
  expect(unreadDot).toBeVisible();
});

test('Unread dot renders as expected', () => {
  const { container } = render(<UnreadRedDot />);
  const unreadDot = container.children[0];
  expect(unreadDot).toHaveStyleRule(
    'background-color',
    colors.logo.fill_positive.rgba
  );
});
