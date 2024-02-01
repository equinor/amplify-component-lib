import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';

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
  user: null,
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

const readyToBePublished: ExperienceReadyToPublishTypes = {
  user: {
    displayName: faker.animal.dog(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  notificationType: NotificationsTypes.EXPERIENCE_READY_TO_PUBLISH,
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
  experienceCount: 3,
  well: { displayName: faker.animal.dog() },
};

const requestReviewOrca: RequestReviewOrcaTypes = {
  user: {
    displayName: faker.animal.dog(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  notificationType: NotificationsTypes.REQUESTED_REVIEW,
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
  fromUser: {
    displayName: faker.company.name(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  branchName: faker.animal.rabbit(),
};

const reviewQANotification: ReviewQANotificationsTypes = {
  user: {
    displayName: '',
    shortName: '',
    image: '',
    userRole: '',
  },
  notificationType: NotificationsTypes.QA_COMMENTS,
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
  experienceComments: faker.number.int(),
  well: {
    displayName: faker.animal.cetacean(),
    shortName: faker.lorem.sentence(),
  },
  experience: {
    id: '1',
    title: faker.color.rgb(),
    topic: {
      displayName: faker.animal.cetacean(),
      shortName: faker.lorem.sentence(),
    },
  },
};

const due3weeksnotification: Due3WeeksTypes = {
  user: {
    displayName: '',
    shortName: '',
    image: '',
    userRole: '',
  },
  notificationType: NotificationsTypes.DUE_3_WEEKS,
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
  commentsCount: faker.number.int(),
  well: {
    displayName: faker.animal.cetacean(),
    shortName: faker.lorem.sentence(),
  },
};

const requestChangeOrca: RequestChangeOrcaTypes = {
  user: {
    displayName: faker.animal.dog(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  notificationType: NotificationsTypes.REQUESTED_CHANGES,
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
  fromUser: {
    displayName: faker.company.name(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  branchName: faker.animal.rabbit(),
};

const mergeBranchOrca: MergeBranchOrcaTypes = {
  user: {
    displayName: faker.animal.dog(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  notificationType: NotificationsTypes.MERGE_BRANCH,
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
  fromUser: {
    displayName: faker.company.name(),
    shortName: faker.animal.cat(),
    image: 'path/to/image.jpg',
    userRole: faker.animal.bird(),
  },
  branchName: faker.animal.rabbit(),
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
  // const applicationName = screen.getByText(system.applicationName);
  // expect(applicationName).toBeInTheDocument();
  console.log();
  // expect(screen.getByText(system.applicationName)).toBeInTheDocument();
  screen.logTestingPlaygroundURL();
});

test('renders footer correctly', () => {
  render(<NotificationTemplate {...fakeNotifications} />);

  expect(screen.getByText(fakeNotifications.field)).toBeInTheDocument();
});

test('renders ReadyToReportNotification correctly', async () => {
  render(<NotificationTemplate {...systemNotifications} />);
  expect(screen.getByText(systemNotifications.wellbore)).toBeInTheDocument();

  screen.logTestingPlaygroundURL();
});

test(' MergeBranchOrca ', () => {
  render(<NotificationTemplate {...mergeBranchOrca} />);

  const text = screen.getByText(/ has merged your branch/i);

  expect(text).toBeInTheDocument();
});

test('Experience in 3 weeks  ', () => {
  render(<NotificationTemplate {...due3weeksnotification} />);

  expect(
    screen.getByText('Experience report are due in 3 weeks')
  ).toBeInTheDocument();
  expect(
    screen.getByText(due3weeksnotification.well.displayName ?? '')
  ).toBeInTheDocument();
});

test(' RequestChangeOrca ', () => {
  render(<NotificationTemplate {...requestChangeOrca} />);

  const text = screen.getByText(/has request/i);

  expect(text).toBeInTheDocument();
});

test('ReviewQANotification ', () => {
  render(<NotificationTemplate {...reviewQANotification} />);

  expect(screen.getByText('Please review my QA comments')).toBeInTheDocument();
  expect(
    screen.getByText(reviewQANotification.well.displayName ?? '')
  ).toBeInTheDocument();
});

test(' RequestReviewOrca ', () => {
  render(<NotificationTemplate {...requestReviewOrca} />);

  const text = screen.getByText(/has requested review/i);
  expect(text).toBeInTheDocument();
});

test(' ReadyToBePublished ', () => {
  render(<NotificationTemplate {...readyToBePublished} />);

  expect(
    screen.getByText(readyToBePublished.well.displayName ?? '')
  ).toBeInTheDocument();

  expect(
    screen.getByText(readyToBePublished.experienceCount)
  ).toBeInTheDocument();
});
