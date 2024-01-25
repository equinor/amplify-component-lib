import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
} from './Notifications.types';
import NotificationTemplate from './NotificationTemplate';

import { expect } from 'vitest';

function fakeNotifications():
  | ReadyToReportNotificationTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | Due3WeeksTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes {
  return {
    user: {
      displayName: faker.animal.dog(),
      shortName: faker.animal.cat(),
      image: 'path/to/image.jpg',
      userRole: faker.animal.bird(),
    },
    notificationType: NotificationsTypes.DEFAULT,
    applicationName: faker.animal.crocodilia(),
    Read: faker.datatype.boolean(),
    field: faker.animal.horse(),
    time: new Date(faker.date.past()).getTime(),
    onDelete: vi.fn(),
    message: faker.lorem.sentence(),
    SequenceNumber: faker.number.int(),
    toUser: {
      displayName: faker.animal.rabbit(),
      shortName: faker.animal.crocodilia(),
      image: 'path/to/image.jpg',
      userRole: faker.animal.fish(),
    },
  };
}

const notificationFake = new Array(faker.number.int({ min: 4, max: 8 }))
  .fill(0)
  .map(() => fakeNotifications());

console.log(notificationFake, 'not');

test('renders user information correctly', () => {
  render(<NotificationTemplate {...notificationFake} />);

  for (const notification of notificationFake) {
    expect(screen.getByText(notification.user?.shortName ?? ''));
  }

  screen.logTestingPlaygroundURL();
  // Check if user information is rendered correctly
  // const userImage = screen.getByText(notificationFake.user?.shortName ?? '');
  //
  // expect(screen.getByText('John Doe')).toBeInTheDocument();
  // expect(screen.getByText('JD')).toBeInTheDocument();
  // expect(userImage).toBeInTheDocument();
});

// test('renders system user information correctly', () => {
//   const props = {
//     ...defaultProps,
//     user: null,
//   };
//
//   render(<NotificationTemplate {...props} />);
//
//   // Check if system user information is rendered correctly
//   const applicationName = screen.getByText(props.applicationName);
//
//   expect(applicationName).toBeInTheDocument();
//   expect(screen.getByText('Sample App')).toBeInTheDocument();
// });

test('renders content based on notification type', () => {
  const props = {
    ...defaultProps,
    NotificationType: NotificationsTypes.DEFAULT,
  };

  render(<NotificationTemplate {...props} />);

  expect(screen.getByTestId(NotificationsTypes.DEFAULT)).toBeInTheDocument();
});

test('renders footer correctly', () => {
  render(<NotificationTemplate {...defaultProps} />);

  expect(screen.getByText('Sample App')).toBeInTheDocument();
  expect(screen.getByText('Sample Field')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('calls onDelete when delete button is clicked', async () => {
  const onDelete = vi.fn();
  render(<NotificationTemplate {...defaultProps} />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');
  //
  await user.click(button);
  await waitFor(() => {
    expect(onDelete).toHaveBeenCalledWith();
  });

  // expect(onDelete).toHaveBeenCalled();
  screen.logTestingPlaygroundURL();

  // expect(screen.getByRole('button')).toBeVisible();

  // expect(defaultProps.onDelete).toHaveBeenCalled();
});
