import { useCallback, useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

import { getCookie } from '@shared/common/utils';
import { useGetAgendaList } from '@shared/meeting/apis';
import { BROKER_URL } from '@shared/common/constants';

export const useControlAgenda = (
  meetingId: string,
  agendaId: number,
  isFirstPendingAgenda: boolean
) => {
  const client = useRef<StompJs.Client | null>();

  const { refetch: refetchAgendaList } = useGetAgendaList({
    token: getCookie('token'),
    meetingId
  });

  const connect = useCallback(() => {
    client.current = new StompJs.Client({
      brokerURL: BROKER_URL,
      connectHeaders: {
        Authorization: `${getCookie('token')}`
      },
      // debug: (str) => {
      //   console.log(str);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    // client.current.webSocketFactory = function () {
    //   return new SockJS(
    //     'http://facerain-dev.iptime.org:8080/ws'
    //   );
    // };

    const callback = (message: StompJs.Message) => {
      if (message.body) {
        // console.log(JSON.parse(message.body));
        refetchAgendaList();
      }
    };

    const subscribe = () => {
      // console.log('[구독]', client.current);
      client.current?.subscribe(
        `/topic/meeting/${meetingId}/agendas/${agendaId}/status`,
        callback
      );
    };

    client.current.onConnect = () => {
      subscribe();
    };

    client.current.activate();

    // changeClient(client.current); // 클라이언트 갱신
  }, [meetingId, agendaId, refetchAgendaList]);

  const sendMessage = (action: string) => {
    // console.log('[메세지 전송]', client.current);
    client.current?.publish({
      destination: `/app/meeting/${meetingId}/agendas/${agendaId}/action`,
      body: JSON.stringify({
        action
      })
    });
  };

  const disConnect = () => {
    if (client.current === null) {
      return;
    }
    client.current?.deactivate();
  };

  useEffect(() => {
    if (isFirstPendingAgenda) {
      // console.log(isFirstPendingAgenda, agendaId);
      connect();
    }
    // return () => disConnect();
  }, [isFirstPendingAgenda, connect]);

  return { connect, disConnect, sendMessage };
};
