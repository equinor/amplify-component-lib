import { FC } from 'react';

import { NotificationProvider } from './NotificationProvider';
import { NotificationsInner, NotificationsProps } from './NotificationsInner';

export const Notifications: FC<NotificationsProps> = (props) => {
  return (
    <NotificationProvider>
      <NotificationsInner {...props} />
    </NotificationProvider>
  );
};
