import { useCallback, useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from '@shared/common/utils';
import { useGetAgendaList } from '@shared/meeting/apis';
import { BROKER_URL } from '@shared/common/constants';

export interface ReorderAgendaMessage {
  agendaIds: number[];
}

export const useReorderAgenda = (meetingId: string) => {
  const client = useRef<StompJs.Client>();
  const subscription = useRef<StompJs.StompSubscription>();

  const { refetch: refetchAgendaList } = useGetAgendaList({
    token: getCookie('token'),
    meetingId
  });

  const connect = useCallback(() => {
    if (client.current?.active) return;

    client.current = new StompJs.Client({
      brokerURL: BROKER_URL,
      connectHeaders: {
        Authorization: `${getCookie('token')}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscription.current = client.current?.subscribe(
          `/topic/meeting/${meetingId}/agendas/order`,
          (message) => {
            if (message.body) {
              refetchAgendaList();
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      }
    });

    client.current.activate();
  }, [meetingId, refetchAgendaList]);

  const sendReorderAgendaMessage = useCallback(
    (message: ReorderAgendaMessage) => {
      if (!client.current?.active) {
        console.warn('WebSocket connection not active');
        return;
      }

      client.current.publish({
        destination: `/app/meeting/${meetingId}/agendas/order`,
        body: JSON.stringify(message)
      });
    },
    [meetingId]
  );

  const disconnect = useCallback(() => {
    subscription.current?.unsubscribe();
    client.current?.deactivate();
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    sendReorderAgendaMessage,
    isConnected: !!client.current?.active
  };
};
