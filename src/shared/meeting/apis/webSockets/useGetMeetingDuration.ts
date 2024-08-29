import { useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

import { getCookie } from '@shared/common/utils';

export const useGetMeetingDuration = () => {
  const client = useRef<StompJs.Client | null>();

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://facerain-dev.iptime.org:8080/ws',
      connectHeaders: {
        Authorization: `${getCookie('token')}`
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    // client.current.webSocketFactory = function () {
    //   return new SockJS(
    //     'http://facerain-dev.iptime.org:8080/ws/app/meeting/65/agendas/59/action?action=resume'
    //   );
    // };

    const callback = (message: StompJs.Message) => {
      if (message.body) {
        console.log('[회의실 입장]', JSON.parse(message.body));
        // let msg = JSON.parse(message.body);
      }
    };

    const subscribe = () => {
      client.current?.subscribe('/topic/meeting/65/current-duration', callback);
    };

    const sendMessage = () => {
      client.current?.publish({
        destination: '/app/meeting/65/current-duration',
        body: JSON.stringify({})
      });
    };

    client.current.onConnect = () => {
      subscribe();
      sendMessage();
    };

    client.current.activate();

    // changeClient(client.current); // 클라이언트 갱신
  };

  const disConnect = () => {
    if (client.current === null) {
      return;
    }
    client.current?.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);
};
