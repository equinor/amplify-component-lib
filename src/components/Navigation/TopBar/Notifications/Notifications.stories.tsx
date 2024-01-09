import { Divider } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import Notifications, { UnreadRedDot } from './Notifications';
import NotificationTemplate, { userNotification } from './NotificationTemplate';

export default {
  title: 'Navigation/TopBar/Notifications',
  component: Notifications,
  argTypes: { hasUnread: { control: 'boolean' } },
  args: { hasUnread: true },
} as Meta;

type StoryFnNotificationItem = {
  Read: boolean;
  SequenceNumber: number;
  Text: string;
  fromUser: userNotification;
  toUser: userNotification;
  application: string;
  time: string;
  notificationType: string;
};

const items: StoryFnNotificationItem[] = [
  {
    Read: false,
    SequenceNumber: 1,
    Text: 'Notification item 1',
    fromUser: {
      userRole: 'Admin',
      shortName: 'Captain',
      displayName: 'Mr Captain',
      image: 'placeholder',
    },

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Mrs Captain',
      image: 'placeholder',
    },
    application: 'Dasha',
    time: ' 2 seconds ago',
    notificationType: 'default',
  },
  {
    Read: true,
    SequenceNumber: 2,
    Text: 'Notification item 2',
    fromUser: {
      userRole: 'Admin',
      shortName: 'Captain',
      displayName: 'Mr Captain',
      image: 'placeholder',
    },

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Mrs Captain',
      image: 'placeholder',
    },
    application: 'PWEX',
    time: ' yesterday',
    notificationType: 'default',
  },
  {
    Read: true,
    SequenceNumber: 3,
    Text: 'Notification item 3 test test test test test test test test test test test test test test test ',
    fromUser: {
      userRole: 'Admin',
      shortName: 'Captain',
      displayName: 'Mr Captain',
      image: 'placeholder',
    },

    toUser: {
      userRole: 'Admins',
      shortName: 'Captains',
      displayName: 'Mrs Captain',
      image: 'placeholder',
    },
    application: 'Recap',
    time: ' yesterday',
    notificationType: 'default',
  },
];

export const Primary: StoryFn = (args) => {
  return (
    <Notifications hasUnread={args.hasUnread} setAllAsRead={() => null}>
      {items.map((item) => {
        return (
          <div key={item.SequenceNumber}>
            {/*TODO: fix*/}
            {/*<div>{!item.Read && <UnreadRedDot />}</div>*/}
            {/*<div>{'Sequence number: ' + item.SequenceNumber}</div>*/}
            {/*<div>{item.Text}</div>*/}
            {/*<Divider />*/}
            <NotificationTemplate
              message={item.Text}
              fromUser={item.fromUser}
              toUser={item.toUser}
              SequenceNumber={item.SequenceNumber}
              Read={item.Read}
              applicationName={item.application}
              time={item.time}
            />
          </div>
        );
      })}
    </Notifications>
  );
};
