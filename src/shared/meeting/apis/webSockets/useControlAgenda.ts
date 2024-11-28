import { useCallback, useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from '@shared/common/utils';
import { useGetAgendaList } from '@shared/meeting/apis';
import { BROKER_URL } from '@shared/common/constants';

export interface ControlAgendaMessage {
  action: 'start' | 'pause' | 'resume' | 'extend' | 'reduce' | 'end';
  modifiedDuration?: string;
}

export const useControlAgenda = (
  meetingId: string,
  agendaId: number,
  isFirstPendingAgenda: boolean
) => {
  const client = useRef<StompJs.Client | null>();
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
          `/topic/meeting/${meetingId}/agendas/${agendaId}/status`,
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
  }, [meetingId, agendaId, refetchAgendaList]);

  const sendControlAgendaMessage = useCallback(
    (message: ControlAgendaMessage) => {
      if (!client.current?.active) {
        console.warn('WebSocket connection not active');
        return;
      }

      client.current.publish({
        destination: `/app/meeting/${meetingId}/agendas/${agendaId}/action`,
        body: JSON.stringify(message)
      });
    },
    [meetingId, agendaId]
  );

  const disconnect = useCallback(() => {
    subscription.current?.unsubscribe();
    client.current?.deactivate();
  }, []);

  useEffect(() => {
    if (isFirstPendingAgenda) {
      connect();
    }
    return () => disconnect();
  }, [isFirstPendingAgenda, connect, disconnect]);

  return {
    sendControlAgendaMessage,
    isConnected: !!client.current?.active
  };
};
