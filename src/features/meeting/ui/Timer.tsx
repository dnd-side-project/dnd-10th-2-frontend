import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import {
  ColorFormat,
  CountdownCircleTimer
} from 'react-countdown-circle-timer';

import { Flex } from '@shared/common/ui';
import { theme } from '@shared/common/styles';
import { ControlAgendaMessage } from '@shared/meeting/apis';

import { formatSeconds, formatEndTime } from '@features/meeting/utils';
import { useEffect, useState } from 'react';

/**
 * @default button: (button 태그 속성 그대로)
 *
 * @param time 타이머 총 시간(sec)
 * @param serverTime 서버 시간 Date
 * */
export const Timer = ({
  time,
  serverTime,
  isPlaying,
  sendControlAgendaMessage
}: {
  time: number;
  serverTime: Date;
  isPlaying: boolean;
  sendControlAgendaMessage: (message: ControlAgendaMessage) => void;
}) => {
  const [timerKey, setTimerKey] = useState(0);

  // isPlaying이 false로 변경될 때 타이머 상태를 리셋
  useEffect(() => {
    if (!isPlaying) {
      setTimerKey((prev) => prev + 1);
    }
  }, [isPlaying]);
  return (
    <TimerWrapper justify="flex-start" direction="column">
      <Chip>
        {formatEndTime(DateTime.fromJSDate(serverTime), time)} 종료 예정
      </Chip>
      <Gradient />
      <CountdownCircleTimer
        key={timerKey}
        colors={'url(#blue-gradient)'}
        isPlaying={isPlaying}
        size={260}
        rotation="counterclockwise"
        isGrowing={true}
        duration={time}
        initialRemainingTime={time}
        trailColor={theme.palette.timer_trail as ColorFormat}
        strokeWidth={13}
        onComplete={() => {
          sendControlAgendaMessage({ action: 'end' });
        }}>
        {({ remainingTime }) => formatSeconds(remainingTime)}
      </CountdownCircleTimer>
    </TimerWrapper>
  );
};

const TimerWrapper = styled(Flex)`
  position: relative;
  width: 26rem;
  height: 26rem;

  ${({ theme }) => theme.typo.T1}
  color: ${({ theme }) => theme.palette.timer_typo};

  > div > div {
    top: 7px !important;
  }
`;

const Chip = styled(Flex)`
  ${({ theme }) => theme.typo.B5}
  position: absolute;
  color: ${({ theme }) => theme.palette.orange};
  background-color: ${({ theme }) => theme.palette.light_orange};
  width: 12rem;
  height: 3rem;
  border-radius: 0.8rem;
  top: 7.9rem;
`;

const Gradient = () => {
  return (
    <svg style={{ height: '0px' }}>
      <defs>
        <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D1DEFF" />
          <stop offset="100%" stopColor="#5784FD" />
        </linearGradient>
      </defs>
    </svg>
  );
};
