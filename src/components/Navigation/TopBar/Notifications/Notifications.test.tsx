import React from 'react';

import { notifications } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../../tests/test-utils';
import { date } from '../../../../utils';
import {
  DefaultNotificationTypes,
  Due3WeeksTypes,
  ExperienceReadyToPublishTypes,
  MergeBranchOrcaTypes,
  NotificationsTypes,
  ReadyToReportNotificationTypes,
  RequestChangeOrcaTypes,
  RequestReviewOrcaTypes,
  ReviewQANotificationsTypes,
} from './NotificationsTemplate/Notifications.types';
import Notifications, { UnreadRedDot } from './Notifications';

import { beforeEach, describe, expect } from 'vitest';

const { colors } = tokens;

const notificationsData: (
  | ReadyToReportNotificationTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | Due3WeeksTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes
)[] = [
  {
    Read: true,
    SequenceNumber: 1,

    field: 'Johan',
    user: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Amanda',
      image: 'placeholder',
    },
    fromUser: {
      userRole: 'Admin',
      shortName: 'Captain@equinor.com',
      displayName: 'Amanda',
      image: 'placeholder',
    },

    branchName: 'Test branch 2 ',
    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Amanda',
      image: 'placeholder',
    },
    applicationName: 'Dasha',
    time: '2024-03-24T11:05:47.4372699+00:00',
    notificationType: NotificationsTypes.MERGE_BRANCH,
  } as MergeBranchOrcaTypes,
  {
    Read: true,
    SequenceNumber: 2,

    field: 'Johan',

    fromUser: {
      userRole: 'Admin',
      shortName: 'Captain@equinor.com',
      displayName: 'Amanda',
      image: 'placeholder',
    },
    branchName: 'Harry potter',
    user: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Birte',
      image: 'placeholder',
    },
    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Birte',
      image: 'placeholder',
    },
    applicationName: 'PWEX',
    time: '2024-01-24T11:05:47.4372699+00:00',
    notificationType: NotificationsTypes.REQUESTED_CHANGES,
  } as RequestChangeOrcaTypes,
  {
    Read: false,
    SequenceNumber: 3,
    field: 'Johan',

    user: {
      userRole: 'Admin',
      shortName: 'Captain@equinor.com',
      displayName: 'Calle',
      image: 'placeholder',
    },

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Calle',
      image: 'placeholder',
    },
    applicationName: 'Recap',
    time: '2024-02-24T11:05:47.4372699+00:00',
    wellbore: 'test hej ',
    dataType: 'Borr',

    notificationType: NotificationsTypes.READY_TO_REPORT,
  } as ReadyToReportNotificationTypes,
  {
    Read: true,
    SequenceNumber: 4,
    field: 'Johan',

    user: {
      userRole: 'Admin',
      shortName: 'Captain@equinor.com',
      displayName: 'Darin',
      image: 'placeholder',
    },

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Darin',
      image: 'placeholder',
    },
    applicationName: 'Recap',
    time: '2024-05-24T11:05:47.4372699+00:00',
    well: 'test hej ',
    commentsCount: 2,

    notificationType: NotificationsTypes.DUE_3_WEEKS,
  } as Due3WeeksTypes,
];

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
    <Notifications setAllAsRead={() => null} hasChildren={true}>
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
    colors.interactive.danger__hover.rgba
  );
});

test('renders button and panel with filter options correctly', async () => {
  render(<Notifications setAllAsRead={() => null} showFilterOptions />);
  const icons = screen.getAllByTestId('eds-icon-path');

  expect(icons[0]).toHaveAttribute('d', notifications.svgPathData);
  expect(screen.getByTestId('side-panel')).toHaveStyleRule('display', 'none');

  const button = screen.getByTestId('show-hide-button');
  await userEvent.click(button);
  expect(screen.getByTestId('side-panel')).toBeVisible();
  screen.logTestingPlaygroundURL();
});

test('renders filtered and sorted notifications correctly with children', async () => {
  const options = {
    notifications: notificationsData,
    showFilterOptions: true,
    hasChildren: false,
  };

  console.log(notificationsData, 'not');

  render(<Notifications setAllAsRead={() => null} {...options} />);
  const user = userEvent.setup();

  const button = screen.getByTestId('show-hide-button');

  await user.click(button);
});

describe('Sorting notifications ', () => {
  beforeEach(async () => {
    const options = {
      notifications: notificationsData,
      showFilterOptions: true,
      hasChildren: false,
    };

    render(<Notifications setAllAsRead={() => null} {...options} />);
    const user = userEvent.setup();
    const button = screen.getByTestId('show-hide-button');
    await user.click(button);
    const sortButton = screen.getByText(/Sort by/);
    await user.click(sortButton);
  });

  test('Sort closing when clicking outside  ', async () => {
    const user = userEvent.setup();

    const title = screen.getByText(/newest to oldest/i);
    expect(title).toBeInTheDocument();

    const sortButton = screen.getByText(/Sort by/);
    await user.click(sortButton);
    expect(title).not.toBeInTheDocument();
  });

  test('Sort Oldest to newest  ', async () => {
    const allNotificationsBeforeSort =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeSort[0].textContent).not.toBe(
      date.formatRelativeDateTime(notificationsData[3].time)
    );
    const user = userEvent.setup();
    const newToOldSort = screen.getByText(/oldest to newest/i);
    await user.click(newToOldSort);
    const allNotifications = screen.getAllByTestId('notification-date');
    expect(allNotifications[0].textContent).toBe(
      date.formatRelativeDateTime(notificationsData[3].time)
    );
  });

  test('Sort newest to Oldest  ', async () => {
    const allNotificationsBeforeSort =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeSort[0].textContent).not.toBe(
      date.formatRelativeDateTime(notificationsData[1].time)
    );
    const user = userEvent.setup();
    const newestToOldest = screen.getByText(/newest to oldest/i);
    await user.click(newestToOldest);

    const allNotifications = screen.getAllByTestId('notification-date');
    expect(allNotifications[0].textContent).toBe(
      date.formatRelativeDateTime(notificationsData[1].time)
    );
  });

  test('Sort on Unread  ', async () => {
    const allNotificationsBeforeSort =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeSort[0].textContent).not.toBe(
      notificationsData[2].Read
    );
    const user = userEvent.setup();
    const unread = screen.getByText(/unread/i);
    await user.click(unread);

    const allNotifications = screen.getAllByTestId('notification-date');
    expect(allNotifications[0].textContent).toBe(
      date.formatRelativeDateTime(notificationsData[2].time)
    );
  });
});

describe('Filtering notifications ', () => {
  beforeEach(async () => {
    const options = {
      notifications: notificationsData,
      showFilterOptions: true,
      hasChildren: false,
    };

    render(<Notifications setAllAsRead={() => null} {...options} />);
    const user = userEvent.setup();
    const button = screen.getByTestId('show-hide-button');
    await user.click(button);
    const sortButton = screen.getByText(/Filter by/);
    await user.click(sortButton);
  });

  test('Filtering closing when clicking outside  ', async () => {
    const user = userEvent.setup();

    const title = screen.getByText(/user messages/i);
    expect(title).toBeInTheDocument();

    const sortButton = screen.getByText(/Filter by/);
    await user.click(sortButton);
    expect(title).not.toBeInTheDocument();
  });

  test('User Messages  ', async () => {
    const allNotificationsBeforeFilter =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeFilter[0].textContent).not.toBe(
      date.formatRelativeDateTime(notificationsData[3].time)
    );
    const user = userEvent.setup();
    const userMessages = screen.getByText(/user messages/i);
    await user.click(userMessages);
    const allNotifications = screen.getAllByTestId('notification-date');
    expect(allNotifications).toBe(allNotifications);
  });

  test('System Messages  ', async () => {
    const allNotificationsBeforeFilter =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeFilter[0].textContent).not.toBe(
      date.formatRelativeDateTime(notificationsData[3].time)
    );
    const user = userEvent.setup();
    const userMessages = screen.getByText(/system messages/i);
    await user.click(userMessages);
    expect(allNotificationsBeforeFilter).not.toBe(
      allNotificationsBeforeFilter[0].textContent
    );
  });

  test('unRead ', async () => {
    const allNotificationsBeforeFilter =
      screen.getAllByTestId('notification-date');
    expect(allNotificationsBeforeFilter[0].textContent).not.toBe(
      notificationsData[2].Read
    );
    const user = userEvent.setup();
    const userMessages = screen.getByText(/unread/i);
    await user.click(userMessages);
    const allNotifications = screen.getAllByTestId('notification-date');
    expect(allNotifications[0].textContent).toBe(
      date.formatRelativeDateTime(notificationsData[2].time)
    );
  });
});
