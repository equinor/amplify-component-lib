import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import { render, screen, userEvent } from '../../../../../../tests/test-utils';
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
  SystemUserTypes,
} from '../Notifications.types';
import DeafultNotification from './DeafultNotification';
import ExperienceDue3Weeks from './ExperienceDue3Weeks';
import MergedBranchOrca from './MergedBranchOrca';
import ReadyToBePublished from './ReadyToBePublished';
import RequestChangeOrca from './RequestChangeOrca';
import RequestReviewOrca from './RequestReviewOrca';
import ReviewQANotification from './ReviewQANotification';
import SystemUserDefault from './SystemUserDefault';

import { expect } from 'vitest';

const defaultProps: DefaultNotificationTypes = {
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

const systemUserNotification: SystemUserTypes = {
  user: {
    displayName: '',
    shortName: '',
    image: '',
    userRole: '',
  },
  notificationType: NotificationsTypes.SYSTEM_USER,
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

test(' DefaultNotification ', () => {
  render(<DeafultNotification {...defaultProps} />);

  expect(screen.getByTestId(NotificationsTypes.DEFAULT)).toBeInTheDocument();
  expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
});
test(' SystemUser ', async () => {
  const onClick = vi.fn();
  render(<SystemUserDefault {...systemUserNotification} onClick={onClick} />);

  const findLocation = screen.getByRole('button', { name: /go to location/i });
  expect(findLocation).toBeInTheDocument();
  const user = userEvent.setup();
  await user.click(findLocation);
  expect(onClick).toHaveBeenCalled();
});

test(' ReadyToBePublished ', () => {
  const onClick = vi.fn();

  render(<ReadyToBePublished {...readyToBePublished} onClick={onClick} />);

  expect(
    screen.getByText(readyToBePublished.well.displayName ?? '')
  ).toBeInTheDocument();

  expect(
    screen.getByText(readyToBePublished.experienceCount)
  ).toBeInTheDocument();

  fireEvent.click(screen.getByText('Experiences are ready to be published'));

  expect(onClick).toHaveBeenCalled();
});

test(' RequestReviewOrca ', () => {
  const onClick = vi.fn();

  render(<RequestReviewOrca {...requestReviewOrca} onClick={onClick} />);

  const text = screen.getByText(/has requested review/i);
  expect(text).toBeInTheDocument();

  screen.logTestingPlaygroundURL();
});
//
// test('ReviewQANotification ', () => {
//   const onClick = vi.fn();
//   render(<ReviewQANotification {...reviewQANotification} onClick={onClick} />);
//
//   expect(screen.getByText('Please review my QA comments')).toBeInTheDocument();
//   expect(
//     screen.getByText(reviewQANotification.well.displayName ?? '')
//   ).toBeInTheDocument();
//
//   fireEvent.click(screen.getByText('Please review my QA comments'));
//
//   expect(onClick).toHaveBeenCalled();
// });
//
// test('Experience in 3 weeks  ', () => {
//   const onClick = vi.fn();
//   render(<ExperienceDue3Weeks {...due3weeksnotification} onClick={onClick} />);
//
//   expect(
//     screen.getByText('Experience report are due in 3 weeks')
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(due3weeksnotification.well.displayName ?? '')
//   ).toBeInTheDocument();
//
//   fireEvent.click(screen.getByText('Experience report are due in 3 weeks'));
//
//   expect(onClick).toHaveBeenCalled();
// });
//
// test(' RequestChangeOrca ', () => {
//   const onClick = vi.fn();
//
//   render(<RequestChangeOrca {...requestChangeOrca} onClick={onClick} />);
//
//   const text = screen.getByText(/has request/i);
//
//   expect(text).toBeInTheDocument();
// });
//
// test(' MergeBranchOrca ', () => {
//   const onClick = vi.fn();
//
//   render(<MergedBranchOrca {...mergeBranchOrca} onClick={onClick} />);
//
//   const text = screen.getByText(/ has merged your branch/i);
//
//   expect(text).toBeInTheDocument();
// });
