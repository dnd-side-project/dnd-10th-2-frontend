import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Button } from '@shared/common/ui';
import { useResizeHeight } from '@shared/common/hooks';

interface DialogTimerProps {
  time: number;
}
const DialogTimer = ({ time }: DialogTimerProps) => {
  const [timeState, setTimeState] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => setTimeState((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <StyledTimerLayer>
      <StyledTimer time={timeState}>{timeState}</StyledTimer>
    </StyledTimerLayer>
  );
};

interface DialogTitleProps {
  children?: ReactNode;
  isCenter?: boolean;
}
const DialogTitle = ({ children, isCenter = false }: DialogTitleProps) => {
  return <StyledDialogTitle isCenter={isCenter}>{children}</StyledDialogTitle>;
};

interface DialogCommentProps {
  children?: ReactNode;
  isCenter?: boolean;
}
const DialogComment = ({ children, isCenter = false }: DialogCommentProps) => {
  return (
    <StyledDialogComment isCenter={isCenter}>{children}</StyledDialogComment>
  );
};

interface DialogButtonListProps {
  children?: ReactNode;
}
const DialogButtonList = ({ children }: DialogButtonListProps) => {
  return <StyledDialogButtonList>{children}</StyledDialogButtonList>;
};

interface DialogButtonProps {
  children?: ReactNode;
  isCloseButton?: boolean;
  onClick?: () => void;
}
const DialogButton = ({
  children,
  isCloseButton = false,
  onClick
}: DialogButtonProps) => {
  if (isCloseButton) {
    return (
      <Button
        size="md"
        backgroundColor="skyblue"
        textColor="main_blue"
        onClick={() => onClick && onClick()}>
        닫기
      </Button>
    );
  }

  return (
    <Button
      size="md"
      backgroundColor="main_blue"
      onClick={() => onClick && onClick()}>
      {children}
    </Button>
  );
};

interface DialogContentProps {
  children?: ReactNode;
}
const DialogContent = ({ children }: DialogContentProps) => {
  return <div>{children}</div>;
};

interface DialogSpacingProps {
  children?: ReactNode;
  size: number;
}
const DialogSpacing = ({ children, size }: DialogSpacingProps) => {
  return (
    <div
      css={css`
        height: ${size}rem;
      `}>
      {children}
    </div>
  );
};

interface DialogMainProps {
  children?: ReactNode;
}
const DialogMain = ({ children }: DialogMainProps) => {
  useResizeHeight();

  const el = document.getElementById('dialog');
  if (!el) {
    return null;
  }

  return createPortal(
    <StyledDialogOverlay>
      <StyledDialogMain>{children}</StyledDialogMain>
    </StyledDialogOverlay>,
    el
  );
};

export const Dialog = Object.assign(DialogMain, {
  Timer: DialogTimer,
  Title: DialogTitle,
  Comment: DialogComment,
  ButtonList: DialogButtonList,
  Button: DialogButton,
  Content: DialogContent,
  Spacing: DialogSpacing
});

const StyledTimerLayer = styled.div`
  position: absolute;
  top: calc(-7rem / 2);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.white};
`;

const StyledTimer = styled.div<{ time: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.2465rem;
  height: 6.2465rem;
  border-radius: 100%;
  background-color: ${({ time, theme }) =>
    time > 5 ? theme.palette.light_skyblue : theme.palette.light_orange};
  color: ${({ time, theme }) =>
    time > 5 ? theme.palette.main_blue : theme.palette.orange};
  font-size: 4rem;
  font-weight: 800;
  line-height: 3rem;
  letter-spacing: -0.6px;
`;

const StyledDialogTitle = styled.div<{ isCenter: boolean }>`
  width: 100%;
  color: ${({ theme }) => theme.palette.dark_gray2};
  ${({ theme }) => theme.typo.T4}
  text-align: ${({ isCenter }) => (isCenter ? 'center' : 'start')};
  white-space: pre-wrap;
`;

const StyledDialogComment = styled.div<{ isCenter: boolean }>`
  width: 100%;
  color: ${({ theme }) => theme.palette.middle_gray3};
  ${({ theme }) => theme.typo.BM3}
  text-align: ${({ isCenter }) => (isCenter ? 'center' : 'start')};
  white-space: pre-wrap;
`;

const StyledDialogButtonList = styled.div`
  display: flex;
  width: 100%;
  gap: 1.2rem;
`;

const StyledDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-color: rgba(10, 17, 28, 0.6);
  padding: 0 2rem;
  z-index: 99;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 375px;
  }
`;

const StyledDialogMain = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32rem;
  padding: 0 2.6rem;
  background-color: white;
  border-radius: 1.6rem;
  box-sizing: border-box;
`;
