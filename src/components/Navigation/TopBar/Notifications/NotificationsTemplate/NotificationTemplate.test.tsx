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

const fakeNotifications:
  | ReadyToReportNotificationTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | Due3WeeksTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes = {
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
  time: faker.date.past().toString(),
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

const systemNotifications:
  | ReadyToReportNotificationTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | Due3WeeksTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes = {
  user: {
    displayName: '',
    shortName: '',
    image: '',
    userRole: '',
  },
  notificationType: NotificationsTypes.READY_TO_REPORT,
  applicationName: faker.animal.crocodilia(),
  Read: faker.datatype.boolean(),
  field: faker.animal.horse(),
  time: faker.date.past().toString(),
  onDelete: vi.fn(),

  SequenceNumber: faker.number.int(),
  toUser: {
    displayName: faker.animal.rabbit(),
    shortName: faker.animal.crocodilia(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.fish(),
  },
  dataType: faker.animal.rodent(),
  wellbore: faker.color.rgb(),
};

const system:
  | ReadyToReportNotificationTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | Due3WeeksTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes = {
  user: {
    displayName: '',
    shortName: '',
    image: '',
    userRole: '',
  },
  notificationType: NotificationsTypes.DEFAULT,
  applicationName: faker.animal.crocodilia(),
  Read: faker.datatype.boolean(),
  field: faker.animal.horse(),
  time: faker.date.past().toString(),
  onDelete: vi.fn(),

  SequenceNumber: faker.number.int(),
  toUser: {
    displayName: faker.animal.rabbit(),
    shortName: faker.animal.crocodilia(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.fish(),
  },
  message: faker.lorem.sentence(),
};

test('renders user information correctly', () => {
  render(<NotificationTemplate {...fakeNotifications} />);

  expect(
    screen.getByText(fakeNotifications.user?.shortName ?? '')
  ).toBeInTheDocument();
  expect(screen.getByText(fakeNotifications.message)).toBeInTheDocument();
  expect(
    screen.getByText(fakeNotifications.user?.displayName ?? '')
  ).toBeInTheDocument();
  expect(screen.getByTestId(NotificationsTypes.DEFAULT)).toBeInTheDocument();
});

test('renders system user information correctly', () => {
  render(<NotificationTemplate {...system} />);

  // expect(screen.getByText('')).toBeInTheDocument();
  screen.logTestingPlaygroundURL();
});

test('renders footer correctly', () => {
  render(<NotificationTemplate {...fakeNotifications} />);

  expect(screen.getByText(fakeNotifications.field)).toBeInTheDocument();
});

test('calls onDelete when delete button is clicked', async () => {
  const onDelete = vi.fn();
  render(<NotificationTemplate {...fakeNotifications} />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');

  await user.click(button);
  await waitFor(() => {
    expect(onDelete).toHaveBeenCalledWith();
  });

  // expect(onDelete).toHaveBeenCalled();

  // expect(screen.getByRole('button')).toBeVisible();

  // expect(defaultProps.onDelete).toHaveBeenCalled();
});

test('renders ReadyToReportNotification correctly', async () => {
  render(<NotificationTemplate {...systemNotifications} />);
  expect(screen.getByText(systemNotifications.wellbore)).toBeInTheDocument();

  // const button = screen.getByTestId('show-hide-button');
  // await user.click(button);
  screen.logTestingPlaygroundURL();
  // expect(
  //   screen.getByTestId('ready-to-report-notification')
  // ).toBeInTheDocument();
});
