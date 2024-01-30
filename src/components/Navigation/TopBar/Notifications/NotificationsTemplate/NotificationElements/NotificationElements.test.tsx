import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import { render, screen } from '../../../../../../tests/test-utils';
import {
  DefaultNotificationTypes,
  ExperienceReadyToPublishTypes,
  NotificationsTypes,
  RequestReviewOrcaTypes,
  ReviewQANotificationsTypes,
} from '../Notifications.types';
import DeafultNotification from './DeafultNotification';
import ReadyToBePublished from './ReadyToBePublished';
import RequestReviewOrca from './RequestReviewOrca';
import ReviewQANotification from './ReviewQANotification';

const defaultProps: DefaultNotificationTypes = [
  {
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
  },
];

test(' DefaultNotification ', () => {
  const props: DefaultNotificationTypes = {
    message: 'This is default messages',
  };

  render(<DeafultNotification {...props} />);

  expect(screen.getByTestId(NotificationsTypes.DEFAULT)).toBeInTheDocument();
  expect(screen.getByText('This is default messages')).toBeInTheDocument();
});

test(' ReadyToBePublished ', () => {
  const props: ExperienceReadyToPublishTypes & { onClick: () => void } = {
    experienceCount: 3,
    well: {
      displayName: 'Example Well',
    },
    onClick: vi.fn(),
  };

  render(<ReadyToBePublished {...props} />);

  expect(
    screen.getByText('Experiences are ready to be published')
  ).toBeInTheDocument();
  expect(screen.getByText('Example Well')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Experiences are ready to be published'));

  expect(props.onClick).toHaveBeenCalled();

  screen.logTestingPlaygroundURL();
});

test(' RequestReviewOrca ', () => {
  const props: RequestReviewOrcaTypes & { onClick: () => void } = {
    fromUser: {
      displayName: 'John Doe',
      shortName: 'J D',
      userRole: 'Admin',
      image: 'test.url',
    },
    branchName: 'ExampleBranch',
    onClick: vi.fn(),
  };

  render(<RequestReviewOrca {...props} />);

  expect(
    screen.getByText('John Doe has requested review for branch ExampleBranch')
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByText('John Doe has requested review for branch ExampleBranch')
  );

  expect(props.onClick).toHaveBeenCalled();
});

test('ReviewQANotification ', () => {
  const props: ReviewQANotificationsTypes & { onClick: () => void } = {
    well: {
      displayName: 'Example Well',
      // other well properties
    },
    experienceComments: 2,
    experience: {
      title: 'Example Experience',
      topic: {
        displayName: 'Example Topic',
      },
    },
    onClick: vi.fn(),
  };

  render(<ReviewQANotification {...props} />);

  expect(screen.getByText('Please review my QA comments')).toBeInTheDocument();
  expect(screen.getByText('Example Well')).toBeInTheDocument();
  expect(
    screen.getByText('Example Experience - Example Topic')
  ).toBeInTheDocument();
  expect(screen.getByText('2 comments')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Please review my QA comments'));

  expect(props.onClick).toHaveBeenCalled();
});
