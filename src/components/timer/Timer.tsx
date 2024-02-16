import styled from '@emotion/styled';
import { formatSeconds } from '../../utils/formatSeconds';
import {
  ColorFormat,
  CountdownCircleTimer
} from 'react-countdown-circle-timer';
import { theme } from '@/styles';
import { Flex } from '@/components/Wrapper';
import { formatEndTime } from '@/utils/formatEndTime';
import { DateTime } from 'luxon';

interface TimerProps {
  time: number;
  serverTime: Date;
}

/**
 * @default button: (button 태그 속성 그대로)
 *
 * @param time 타이머 시간(sec)
 * @param serverTime 서버 시간 Date
 * */
export const Timer = ({ time, serverTime }: TimerProps) => {
  return (
    <TimerWrapper justify="flex-start" direction="column">
      <Chip>
        {formatEndTime(DateTime.fromJSDate(serverTime), time)} 종료 예정
      </Chip>
      <Gradient />
      <CountdownCircleTimer
        colors={'url(#blue-gradient)'}
        isPlaying
        size={260}
        rotation="counterclockwise"
        isGrowing={true}
        duration={time}
        trailColor={theme.palette.timer_trail as ColorFormat}
        strokeWidth={13}>
        {({ remainingTime }) => formatSeconds(remainingTime)}
      </CountdownCircleTimer>
    </TimerWrapper>
  );
};

const TimerWrapper = styled(Flex)`
  width: 260px;
  height: 260px;

  ${theme.typo.T1}
  color: ${theme.palette.timer_typo};

  > div > div {
    top: 7px !important;
  }
`;

const Chip = styled(Flex)`
  ${theme.typo.B5}
  color: ${theme.palette.orange};
  background-color: ${theme.palette.light_orange};

  padding: 10px;
  border-radius: 8px;

  position: fixed;
  top: 79px;
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
