import { FC } from 'react';

import NotificationProvider from 'src/components/Navigation/TopBar/Notifications/NotificationProvider';
import {
  NotificationsInner,
  NotificationsProps,
} from 'src/components/Navigation/TopBar/Notifications/NotificationsInner';

const Notifications: FC<NotificationsProps> = (props) => {
  return (
    <NotificationProvider>
      <NotificationsInner {...props} />
    </NotificationProvider>
  );
};

export default Notifications;
