import { useEffect, useMemo, useRef, useState } from 'react';

import * as SignalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

export function useNotifications<
  T extends { SequenceNumber: number; Read: boolean }
>(topic: string, host: string, amplifyPortalToken: string) {
  const connectionRef = useRef<HubConnection | undefined>(undefined);
  const [notifications, setNotifications] = useState<T[]>([]);
  const [
    deletedNotificationSequenceNumber,
    setDeletedNotificationSequenceNumber,
  ] = useState<number>();
  const [updateNotification, setUpdateNotification] = useState<T>();

  type NotificationOptionsType = {
    notifications: T[];
    hasUnreadNotifications: boolean;
    setNotificationAsRead: (notification: T) => void;
    setAllNotificationsAsRead: () => void;
    deleteNotification: (notification: T) => void;
  };

  useEffect(() => {
    const setupConnection = async () => {
      if (!amplifyPortalToken) return;

      const connection = new SignalR.HubConnectionBuilder()
        .withUrl(`${host}/hubs/notifications`, {
          accessTokenFactory: () => amplifyPortalToken,
          withCredentials: false,
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      connectionRef.current = connection;
      connection
        .start()
        .then(() => {
          /* connect to a topic */
          connection.invoke('Subscribe', topic);
        })
        .then(() => {
          connection.on('Connected', () => {
            connection.invoke('PeekMessages'); // get all active messages from bus
          });
          /* connect to a topic */
          connection.onreconnected(() => connection.invoke('Subscribe', topic));

          /* receive all active messages */
          connection.on(
            'ActiveMessages',
            (subject: string, notification: T[]) => {
              if (subject === 'notification') {
                setNotifications(notification.reverse());
              }
            }
          );

          /* receive one new message from the servicebus */
          connection.on('NewMessage', (subject: string, notification: T) => {
            if (subject === 'notification') {
              setNotifications((ct) => [notification, ...ct]);
            }
          });

          /* update a message */
          connection.on('UpdateMessage', (subject: string, notification: T) => {
            /**
             * you cant get the value of state variables inside connection.on()
             * but you can still set state.
             * this uses another useEffect by setting a temp state that updates the notification state.
             */
            setUpdateNotification(notification);
          });

          /* delete a message from servicebus */
          connection.on(
            'Delete',
            (subject: string, notificationSequenceNumber: number) => {
              /**
               * you cant get the value of state variables inside connection.on()
               * but you can still set state.
               * this uses another useEffect by setting a temp state that updates the notification state.
               */
              setDeletedNotificationSequenceNumber(notificationSequenceNumber);
            }
          );

          /* print error to console */
          connection.on('Error', (msg: string) => {
            throw new Error('Connection error: ' + msg);
          });
        })
        .catch((e: any) => {
          throw new Error('Connection failed: ', e);
        });
    };

    setupConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [host, topic, amplifyPortalToken]);

  // Update notification useeffect
  useEffect(() => {
    if (updateNotification) {
      const updateNotificationIndex = notifications.findIndex(
        (x) => x.SequenceNumber === updateNotification!.SequenceNumber
      );
      const tempNotifications = [...notifications];
      if (updateNotificationIndex > -1) {
        tempNotifications[updateNotificationIndex] = updateNotification;
        setNotifications(tempNotifications);
        setUpdateNotification(undefined);
      }
    }
  }, [updateNotification, notifications]);

  // Delete notification useEffect
  useEffect(() => {
    /* remove notification from state */
    if (deletedNotificationSequenceNumber) {
      const removeNotificationIndex = notifications.findIndex(
        (x) => x.SequenceNumber === deletedNotificationSequenceNumber
      );
      const tempNotifications = [...notifications];
      if (removeNotificationIndex > -1) {
        tempNotifications.splice(removeNotificationIndex, 1);
        setNotifications(tempNotifications);
        setDeletedNotificationSequenceNumber(undefined);
      }
    }
  }, [deletedNotificationSequenceNumber, notifications]);

  /* functions */
  async function deleteNotification(notification: T) {
    if (connectionRef.current) {
      await connectionRef.current.invoke(
        'DeleteMessage',
        notification.SequenceNumber
      );
      setDeletedNotificationSequenceNumber(notification.SequenceNumber);
    }
  }

  /* change read true/false */
  const setNotificationAsRead = (notification: T) => {
    if (connectionRef.current) {
      notification.Read = !notification.Read;
      connectionRef.current.invoke(
        'PatchMessage',
        notification.SequenceNumber,
        notification
      );
    }
  };

  const setAllNotificationsAsRead = () => {
    notifications.forEach((no) => {
      if (!no.Read) {
        setNotificationAsRead(no);
      }
    });
  };

  const hasUnreadNotifications = useMemo(() => {
    return notifications.some((no) => no.Read === false);
  }, [notifications]);

  return {
    notifications,
    hasUnreadNotifications,
    setNotificationAsRead,
    setAllNotificationsAsRead,
    deleteNotification,
  } as NotificationOptionsType;
}
