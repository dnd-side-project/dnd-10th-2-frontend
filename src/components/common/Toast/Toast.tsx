import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  children: React.ReactNode;
  isToastOpened: boolean;
  bottom: number;
}

/**
 * Toast 컴포넌트 props 리스트
 * @default {HTMLDivElement}
 *
 * @param {boolean} [isToastOpened]  Toast 컴포넌트의 open 여부
 * @param {number} [bottom] 부모 컴포넌트로부터의 bottom 값(단위: rem)
 */
export const Toast = ({ children, isToastOpened, bottom }: ToastProps) => {
  const toastVariants = {
    invisible: {
      opacity: 0,
      bottom: (bottom - 1) * 10
    },
    visible: {
      opacity: 1,
      bottom: bottom * 10
    },
    exit: {
      opacity: 0,
      bottom: (bottom - 1) * 10
    }
  };
  return (
    <AnimatePresence>
      {isToastOpened && (
        <StyledToast
          bottom={bottom}
          variants={toastVariants}
          initial="invisible"
          animate="visible"
          exit="exit">
          {children}
        </StyledToast>
      )}
    </AnimatePresence>
  );
};

const StyledToast = styled(motion.div)<{ bottom: number }>`
  ${({ theme }) => theme.typo.T7}
  color: ${({ theme }) => theme.palette.white};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: calc(100vw - 1.9rem);
  height: 5.2rem;
  padding: 0 2.4rem;
  background-color: #1c2c58cc;
  border-radius: 1.6rem;
  gap: 1.6rem;
`;
