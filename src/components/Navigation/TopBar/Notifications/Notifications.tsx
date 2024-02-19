import { FC } from 'react';

import NotificationContextProvider from 'src/components/Navigation/TopBar/Notifications/NotificationContextProvider';
import {
  NotificationsInner,
  NotificationsProps,
} from 'src/components/Navigation/TopBar/Notifications/NotificationsInner';

const Notifications: FC<NotificationsProps> = (props) => {
  return (
    <NotificationContextProvider>
      <NotificationsInner {...props} />
    </NotificationContextProvider>
  );
};

export default Notifications;
