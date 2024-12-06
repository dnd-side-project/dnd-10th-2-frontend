import { useCallback, useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from '@shared/common/utils';
import { useGetAgendaList } from '@shared/meeting/apis';
import { BROKER_URL } from '@shared/common/constants';
import { useToast } from '@shared/common/hooks';
import { SvgIcon } from '@shared/common/ui';

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

  const { showToast } = useToast();

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

      // console.log(message.action);
      switch (message.action) {
        case 'start':
          showToast({
            content: (
              <>
                <SvgIcon id="check" />
                <span>안건이 시작되었어요</span>
              </>
            )
          });
          break;
        case 'pause':
          showToast({
            content: (
              <>
                <SvgIcon id="warning" />
                <span>일시정지 되었어요</span>
              </>
            )
          });
          break;
        case 'resume':
          showToast({
            content: (
              <>
                <SvgIcon id="check" />
                <span>안건이 재개되었어요</span>
              </>
            )
          });
          break;
        case 'extend':
          showToast({
            content: (
              <>
                <SvgIcon id="check" />
                <span>시간이 추가되었어요</span>
              </>
            )
          });
          break;
        case 'reduce':
          showToast({
            content: (
              <>
                <SvgIcon id="check" />
                <span>시간이 단축되었어요</span>
              </>
            )
          });
          break;
        case 'end':
          showToast({
            content: (
              <>
                <SvgIcon id="check" />
                <span>안건이 종료되었어요</span>
              </>
            )
          });
          break;
      }
    },
    [meetingId, agendaId, showToast]
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
