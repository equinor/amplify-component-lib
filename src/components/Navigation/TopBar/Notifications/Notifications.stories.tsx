import { Fragment } from 'react';

import { Divider } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import MergedBranchOrca from './NotificationsTemplate/NotificationElements/MergedBranchOrca';
import {
  DefaultNotificationProps,
  Due3WeeksProps,
  ExperienceReadyToPublishProps,
  MergeBranchOrcaProps,
  NotificationsTypes,
  ReadyToReportNotificationProps,
  RequestChangeOrcaProps,
  RequestReviewOrcaProps,
  ReviewQANotificationsProps,
  userNotification,
} from './NotificationsTemplate/Notifications.types';
import NotificationTemplate from './NotificationsTemplate/NotificationTemplate';
import Notifications, { UnreadRedDot } from './Notifications';

export default {
  title: 'Navigation/TopBar/Notifications',
  component: Notifications,
  argTypes: { hasUnread: { control: 'boolean' } },
  args: { hasUnread: true },
} as Meta;

const items: (
  | ReadyToReportNotificationProps
  | RequestChangeOrcaProps
  | MergeBranchOrcaProps
  | Due3WeeksProps
  | ExperienceReadyToPublishProps
  | ReviewQANotificationsProps
  | DefaultNotificationProps
  | RequestReviewOrcaProps
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
    time: 2,
    notificationType: NotificationsTypes.MERGE_BRANCH,
  } as MergeBranchOrcaProps,
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
    time: 8,
    notificationType: NotificationsTypes.REQUESTED_CHANGES,
  } as RequestChangeOrcaProps,
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
    time: 5,
    wellbore: 'test hej ',
    dataType: 'Borr',

    notificationType: NotificationsTypes.READY_TO_REPORT,
  } as ReadyToReportNotificationProps,
  {
    Read: false,
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
    time: 1,
    well: 'test hej ',
    commentsCount: 2,

    notificationType: NotificationsTypes.DUE_3_WEEKS,
  } as Due3WeeksProps,
];

export const Primary: StoryFn = (args) => {
  return (
    <Notifications
      hasUnread={args.hasUnread}
      setAllAsRead={() => null}
      addFilters={true}
      notifications={items}
    />
  );
};
