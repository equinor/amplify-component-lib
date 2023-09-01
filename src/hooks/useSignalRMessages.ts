import { useEffect, useMemo, useRef, useState } from 'react';

import * as SignalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { useQuery } from '@tanstack/react-query';

import { TokenService } from 'src/api/core/OpenAPI';
import { usePrevious } from 'src/hooks/usePrevious';

export function useSignalRMessages<
  T extends {
    SequenceNumber?: number | null;
    Read?: boolean | null;
    Subject?: string | null;
  },
>(topic: string, host: string) {
  const connectionRef = useRef<HubConnection | undefined>(undefined);
  const [messages, setMessages] = useState<T[]>([]);
  const [deletedMessageSequenceNumber, setDeletedMessageSequenceNumber] =
    useState<number>();
  const [updateMessage, setUpdateMessage] = useState<T>();

  const { data: amplifyPortalToken } = useQuery(
    ['get-amplify-portal-token'],
    () => TokenService.getAmplifyPortalToken(),
    {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  );

  const previousTopic = usePrevious(topic);
  const previousHost = usePrevious(host);
  const previousAmplifyPortalToken = usePrevious(amplifyPortalToken);
  useEffect(() => {
    async function setupConnection() {
      if (
        amplifyPortalToken === undefined ||
        (previousTopic === topic &&
          previousHost === host &&
          previousAmplifyPortalToken === amplifyPortalToken)
      ) {
        return;
      }

      if (
        connectionRef.current !== undefined &&
        previousTopic &&
        previousHost &&
        previousAmplifyPortalToken &&
        (previousTopic !== topic ||
          previousHost !== host ||
          previousAmplifyPortalToken !== amplifyPortalToken)
      ) {
        await connectionRef.current.stop();
      }

      const connection = new SignalR.HubConnectionBuilder()
        .withUrl(`${host}/hubs/notifications`, {
          accessTokenFactory: () => amplifyPortalToken,
          withCredentials: false,
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      try {
        await connection.start();

        /* receive messages */
        connection.on(
          'ActiveMessages',
          (subject: string, activeMessages: T[]) => {
            setMessages(
              activeMessages.map((d) => ({ ...d, Subject: subject })).reverse()
            );
          }
        );

        /* connect to a topic */
        connection.onreconnected(() => connection.invoke('Subscribe', topic));

        /* receive one new message from the servicebus */
        connection.on('NewMessage', (subject: string, message: T) => {
          setMessages((ct) => [{ ...message, Subject: subject }, ...ct]);
        });

        /* update a message */
        connection.on('UpdateMessage', (subject: string, message: T) => {
          /**
           * you cant get the value of state variables inside connection.on()
           * but you can still set state.
           * this uses another useEffect by setting a temp state that updates the message state.
           */
          setUpdateMessage({ ...message, Subject: subject });
        });

        /* delete a message from servicebus */
        connection.on(
          'Delete',
          (subject: string, messageSequenceNumber: number) => {
            /**
             * you cant get the value of state variables inside connection.on()
             * but you can still set state.
             * this uses another useEffect by setting a temp state that updates the messages state.
             */
            setDeletedMessageSequenceNumber(messageSequenceNumber);
          }
        );

        /* print error to console */
        connection.on('Error', (msg: string) => {
          throw new Error('Connection error: ' + msg);
        });

        /* connect to a topic */
        await connection.invoke('Subscribe', topic);

        /* Get all active messages */
        await connection.invoke('PeekMessages');
      } catch (e: any) {
        throw new Error('Connection failed: ', e);
      }
      connectionRef.current = connection;
    }

    setupConnection();
  }, [
    host,
    topic,
    amplifyPortalToken,
    previousTopic,
    previousHost,
    previousAmplifyPortalToken,
  ]);

  // Update notification useeffect
  useEffect(() => {
    if (updateMessage) {
      const updateMessageIndex = messages.findIndex(
        (x) => x.SequenceNumber === updateMessage!.SequenceNumber
      );
      const tempNotifications = [...messages];
      if (updateMessageIndex > -1) {
        tempNotifications[updateMessageIndex] = updateMessage;
        setMessages(tempNotifications);
        setUpdateMessage(undefined);
      }
    }
  }, [updateMessage, messages]);

  // Delete notification useEffect
  useEffect(() => {
    /* remove notification from state */
    if (deletedMessageSequenceNumber) {
      const removeNotificationIndex = messages.findIndex(
        (x) => x.SequenceNumber === deletedMessageSequenceNumber
      );
      const tempNotifications = [...messages];
      if (removeNotificationIndex > -1) {
        tempNotifications.splice(removeNotificationIndex, 1);
        setMessages(tempNotifications);
        setDeletedMessageSequenceNumber(undefined);
      }
    }
  }, [deletedMessageSequenceNumber, messages]);

  async function deleteMessage(message: T) {
    if (
      connectionRef.current &&
      message.SequenceNumber !== undefined &&
      message.SequenceNumber !== null
    ) {
      await connectionRef.current.invoke(
        'DeleteMessage',
        message.SequenceNumber
      );
      setDeletedMessageSequenceNumber(message.SequenceNumber);
    }
  }

  const setMessageAsRead = (message: T) => {
    if (connectionRef.current) {
      message.Read = !message.Read;
      connectionRef.current.invoke(
        'PatchMessage',
        message.SequenceNumber,
        message
      );
    }
  };

  const setAllMessagesAsRead = () => {
    messages.forEach((no) => {
      if (!no.Read) {
        setMessageAsRead(no);
      }
    });
  };

  const hasUnreadMessages = useMemo(() => {
    return messages.some((no) => no.Read === false);
  }, [messages]);

  const closeConnection = async () => {
    if (connectionRef.current) {
      return await connectionRef.current.stop();
    }
    return;
  };

  return {
    messages,
    hasUnreadMessages,
    setMessageAsRead,
    setAllMessagesAsRead,
    deleteMessage,
    closeConnection,
  };
}
