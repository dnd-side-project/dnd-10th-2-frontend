import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import { Step1Background } from '@features/onboarding/assets';

export const Step1 = ({ isAlertOpened }: { isAlertOpened: boolean }) => {
  return (
    <>
      <Step1Background />

      <AnimatePresence>
        {isAlertOpened && (
          <StyledAlert
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div>타이밋의 사용 방법이 궁금하다면</div>
            <div>옆으로 넘겨보세요!</div>

            <StyledIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="10"
                viewBox="0 0 11 10"
                fill="none">
                <path
                  d="M7.23168 8.43946C6.46188 9.77279 4.53738 9.77279 3.76758 8.43945L0.97467 3.60198C0.20487 2.26865 1.16712 0.601988 2.70672 0.601988L8.29255 0.601988C9.83215 0.601989 10.7944 2.26866 10.0246 3.60199L7.23168 8.43946Z"
                  fill="#5784FD"
                />
              </svg>
            </StyledIcon>
          </StyledAlert>
        )}
      </AnimatePresence>
    </>
  );
};

const StyledAlert = styled(motion.div)`
  position: absolute;
  left: 50%;
  bottom: 15rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 5.4rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.palette.main_blue};
  color: ${({ theme }) => theme.palette.white};
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.9rem;
  letter-spacing: -0.6px;
`;

const StyledIcon = styled.div`
  position: absolute;
  bottom: -1.2rem;
`;
