import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Flex, Space, Text, SvgIcon } from '@shared/common/ui';
import { theme } from '@shared/common/styles';

import {
  AgendaAbleIcon,
  AgendaDisableIcon,
  BreakTimeAbleIcon,
  BreakTimeDisableIcon
} from '@features/meeting/assets';

interface AgendaCardProps {
  type: 'agenda' | 'breakTime';
  currentOrder: number;
  agendaOrder?: number;
  title?: string;
  time: string;
  isDone?: boolean;
}

export const AgendaCard = ({
  type,
  currentOrder,
  agendaOrder,
  title,
  time,
  isDone = false
}: AgendaCardProps) => {
  return (
    <Wrapper justify="flex-between" isDone={isDone}>
      {type === 'agenda' ? (
        !isDone ? (
          <AgendaAbleIcon width="40" height="40" />
        ) : (
          <AgendaDisableIcon width="40" height="40" />
        )
      ) : !isDone ? (
        <BreakTimeAbleIcon width="40" height="40" />
      ) : (
        <BreakTimeDisableIcon width="40" height="40" />
      )}
      <HorizonSpace width={10} />
      <AgendaWrapper>
        {type === 'agenda' &&
          (!isDone ? (
            <AgendaChip isDone={isDone}>{agendaOrder}번째 안건</AgendaChip>
          ) : (
            <AgendaChip isDone={isDone}>논의완료</AgendaChip>
          ))}
        <Space height={6} />
        <Text typo="T7" color="dark_gray1" height={16}>
          {type === 'agenda' ? `${title}` : '쉬는 시간'}
        </Text>
        <Space height={4} />
        <Text typo="B2" color="light_gray4" height={16}>
          {time}
        </Text>
      </AgendaWrapper>
      <HorizonSpace width={21} />
      {!isDone && (
        <div>
          {currentOrder === agendaOrder ? (
            <SvgIcon id="play" width={30} height={30} />
          ) : (
            <SvgIcon id="play_disabled" width={30} height={30} />
          )}
        </div>
      )}
      <HorizonSpace width={16} />
      {!isDone && <SvgIcon id="dots_mono" width={4} />}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)<{ isDone: boolean }>`
  width: 100%;
  height: fit-content;

  border-radius: 18px;

  padding: 20px 10px 20px 20px;
  box-sizing: border-box;

  flex-shrink: 0;

  ${({ isDone }) =>
    isDone
      ? css`
          background-color: ${theme.palette.light_gray2};
          border: 2px solid #d3d9ee;
        `
      : css`
          background-color: ${theme.palette.white};
        `}

  svg {
    cursor: pointer;
  }
`;

const AgendaWrapper = styled.div`
  width: calc(100% - 131px);
`;

const AgendaChip = styled.div<{ isDone: boolean }>`
  padding: 5px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  width: fit-content;

  ${theme.typo.B6};
  background-color: ${theme.palette.light_white};
  color: ${theme.palette.middle_gray3};

  color: ${({ isDone }) =>
    isDone ? `${theme.palette.light_gray4}` : `${theme.palette.middle_gray3}`};
`;

const HorizonSpace = styled.div<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
`;
