import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import {
  DefaultNotificationTypes,
  ExperienceReadyToPublishTypes,
  NotificationsTypes,
  RequestReviewOrcaTypes,
  SystemUserTypes,
} from '../Notifications.types';
import { DefaultNotification } from './DefaultNotification';
import { ReadyToBePublished } from './ReadyToBePublished';
import { RequestReviewOrca } from './RequestReviewOrca';
import { SystemUserDefault } from './SystemUserDefault';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

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

test('DefaultNotification ', () => {
  render(<DefaultNotification {...defaultProps} />);

  expect(screen.getByTestId(NotificationsTypes.DEFAULT)).toBeInTheDocument();
  expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
});
test('SystemUser ', async () => {
  const onClick = vi.fn();
  render(<SystemUserDefault {...systemUserNotification} onClick={onClick} />);

  const findLocation = screen.getByRole('button', { name: /go to location/i });
  expect(findLocation).toBeInTheDocument();
  const user = userEvent.setup();
  await user.click(findLocation);
  expect(onClick).toHaveBeenCalled();
});

test('ReadyToBePublished ', () => {
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

test('RequestReviewOrca ', () => {
  const onClick = vi.fn();

  render(<RequestReviewOrca {...requestReviewOrca} onClick={onClick} />);

  const text = screen.getByText(/has requested review/i);
  expect(text).toBeInTheDocument();
});
