import { createPortal } from 'react-dom';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/store/toast';

export const Toast = () => {
  const { toast } = useToast();

  const toastVariants = {
    invisible: {
      opacity: 0,
      bottom: (toast.bottom - 1) * 10
    },
    visible: {
      opacity: 1,
      bottom: toast.bottom * 10
    },
    exit: {
      opacity: 0,
      bottom: (toast.bottom - 1) * 10
    }
  };

  const content = (
    <AnimatePresence>
      {toast.isOpened && (
        <StyledToast
          variants={toastVariants}
          initial="invisible"
          animate="visible"
          exit="exit">
          {toast.content}
        </StyledToast>
      )}
    </AnimatePresence>
  );

  const el = document.getElementById('toast');
  if (!el) return null;
  return createPortal(content, el);
};

const StyledToast = styled(motion.div)`
  ${({ theme }) => theme.typo.T7}
  color: ${({ theme }) => theme.palette.white};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: calc(37.5rem - 1.9rem);
  height: 5.2rem;
  padding: 0 2.4rem;
  background-color: #1c2c58cc;
  border-radius: 1.6rem;
  gap: 1.6rem;

  ${media.mobile} {
    width: calc(100vw - 1.9rem);
  }
`;
