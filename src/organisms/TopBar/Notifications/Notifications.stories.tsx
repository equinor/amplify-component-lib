import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

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
import { Notifications } from './Notifications';
import { NotificationsProps } from './NotificationsInner';

export default {
  title: 'Organisms/TopBar/Notifications',
  component: Notifications,
  argTypes: {
    hasUnread: { control: 'boolean' },
    hasChildren: { control: 'boolean' },
  },
  args: { hasUnread: true, hasChildren: true },
} as Meta;

const items: (
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
    Read: false,
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
    time: '2',
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
    time: '8',
    notificationType: NotificationsTypes.REQUESTED_CHANGES,
  } as RequestChangeOrcaTypes,
  {
    Read: true,
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
    time: '5',
    wellbore: 'test hej ',
    dataType: 'Borr',

    notificationType: NotificationsTypes.READY_TO_REPORT,
  } as ReadyToReportNotificationTypes,
  {
    Read: false,
    SequenceNumber: 4,
    field: 'Johan',

    user: null,

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Darin',
      image: 'placeholder',
    },
    applicationName: 'Recap',
    time: '1',
    well: 'test hej ',
    commentsCount: 2,

    notificationType: NotificationsTypes.DUE_3_WEEKS,
  } as Due3WeeksTypes,
];

export const Primary: StoryFn<NotificationsProps> = (args) => {
  return (
    <Notifications
      hasUnread={args.hasUnread}
      setAllAsRead={() => null}
      showFilterOptions={true}
      notifications={items}
    />
  );
};

export const RenderProps: StoryFn<NotificationsProps> = (args) => {
  return (
    <Notifications
      hasUnread={args.hasUnread}
      setAllAsRead={() => null}
      showFilterOptions={true}
      notifications={items}
    >
      {({ onClose }) => (
        <Button onClick={onClose} variant="outlined">
          Discard all
        </Button>
      )}
    </Notifications>
  );
};
