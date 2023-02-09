import { Divider } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import Notifications, { UnreadRedDot } from './Notifications';

export default {
  title: 'Navigation/TopBar/Notifications',
  component: Notifications,
} as Meta;

type StoryNotificationItem = {
  Read: boolean;
  SequenceNumber: number;
  Text: string;
};

const items: StoryNotificationItem[] = [
  {
    Read: false,
    SequenceNumber: 1,
    Text: 'Notification item 1',
  },
  {
    Read: true,
    SequenceNumber: 2,
    Text: 'Notification item 2',
  },
  {
    Read: true,
    SequenceNumber: 3,
    Text: 'Notification item 3',
  },
];

export const Primary: Story = () => {
  return (
    <Notifications hasUnread={true} setAllAsRead={() => null}>
      {items.map((item) => {
        return (
          <div key={item.SequenceNumber}>
            <div>{item.Read && <UnreadRedDot />}</div>
            <div>{'Sequence number: ' + item.SequenceNumber}</div>
            <div>{item.Text}</div>
            <Divider />
          </div>
        );
      })}
    </Notifications>
  );
};
