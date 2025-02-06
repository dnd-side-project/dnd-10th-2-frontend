import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { Button } from '@shared/common/ui';
import { useModal } from '@shared/common/hooks';

export const Modal = () => {
  const {
    modal: {
      isOpened,
      title,
      description,
      textAlign,
      button,
      time,
      topContent,
      bottomContent
    },
    closeModal,
    updateTime
  } = useModal();

  useEffect(() => {
    if (isOpened && time) {
      const timer = setInterval(updateTime, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpened, time, updateTime]);

  useEffect(() => {
    if (time === 0) {
      closeModal();
    }
  }, [time, closeModal]);

  const content = isOpened && (
    <StyledOverlay>
      <StyledModal isTimerExist={time ? true : false}>
        {time && (
          <StyledTimerLayer>
            <StyledTimer time={time}>{time}</StyledTimer>
          </StyledTimerLayer>
        )}

        {topContent}

        <StyledTitle textAlign={textAlign || 'start'}>{title}</StyledTitle>

        {description && (
          <StyledDescription textAlign={textAlign || 'start'}>
            {description}
          </StyledDescription>
        )}

        {bottomContent}

        {button && (
          <StyledButton>
            <Button
              size="md"
              backgroundColor="skyblue"
              textColor="main_blue"
              onClick={closeModal}>
              닫기
            </Button>

            <Button
              size="md"
              backgroundColor="main_blue"
              onClick={button.onClick || (() => null)}>
              {button.text}
            </Button>
          </StyledButton>
        )}
      </StyledModal>
    </StyledOverlay>
  );

  const el = document.getElementById('modal');
  if (!el) return null;
  return createPortal(content, el);
};

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(10, 17, 28, 0.6);
  padding: 0 2rem;
  z-index: 99;

  @media (min-width: 768px) {
    width: 375px;
  }
`;

const StyledModal = styled.div<{ isTimerExist: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ isTimerExist }) =>
    isTimerExist ? '3.7rem 2.6rem 2.8rem 2.6rem' : '2.8rem 2.6rem'};
  background-color: white;
  border-radius: 1.6rem;
  gap: 1.5rem;
`;

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
  font-size: 40px;
  font-weight: 800;
  line-height: 30px;
  letter-spacing: -0.6px;
`;

const StyledTitle = styled.div<{ textAlign: string }>`
  width: 100%;
  color: ${({ theme }) => theme.palette.dark_gray2};
  ${({ theme }) => theme.typo.T4}
  text-align: ${({ textAlign }) => textAlign};
  white-space: pre-wrap;
`;

const StyledDescription = styled.div<{ textAlign: string }>`
  width: 100%;
  color: ${({ theme }) => theme.palette.middle_gray3};
  ${({ theme }) => theme.typo.BM3}
  text-align: ${({ textAlign }) => textAlign};
  white-space: pre-wrap;
`;

const StyledButton = styled.div`
  display: flex;
  width: 100%;
  gap: 1.2rem;
`;
