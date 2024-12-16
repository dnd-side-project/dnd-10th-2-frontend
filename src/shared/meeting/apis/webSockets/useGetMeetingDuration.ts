import { useCallback, useEffect, useRef, useState } from 'react';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from '@shared/common/utils';
import { BROKER_URL } from '@shared/common/constants';

export const useGetMeetingDuration = (meetingId: string) => {
  const client = useRef<StompJs.Client>();
  const subscription = useRef<StompJs.StompSubscription>();
  const [meetingDuration, setMeetingDuration] = useState('00:00:00');

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
          `/topic/meeting/${meetingId}/current-duration`,
          (message) => {
            if (message.body) {
              setMeetingDuration(
                JSON.parse(message.body).body.response.currentDuration
              );
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      }
    });

    client.current.activate();
  }, [meetingId]);

  const sendGetMeetingDurationMessage = useCallback(() => {
    if (!client.current?.active) {
      console.warn('WebSocket connection not active');
      return;
    }

    client.current.publish({
      destination: `/app/meeting/${meetingId}/current-duration`
    });
  }, [meetingId]);

  const disconnect = useCallback(() => {
    subscription.current?.unsubscribe();
    client.current?.deactivate();
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    meetingDuration,
    sendGetMeetingDurationMessage,
    isConnected: !!client.current?.active
  };
};
