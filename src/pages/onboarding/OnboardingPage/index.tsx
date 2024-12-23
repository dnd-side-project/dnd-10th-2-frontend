import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AnimatePresence, motion } from 'framer-motion';

import { SvgIcon } from '@shared/common/ui';
import { media } from '@shared/common/styles';
import {
  // GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL
} from '@shared/onboarding/constants';
import { useResizeHeight } from '@/shared/common/hooks';

import { Step1, Step2, Step3, Step4, Step5 } from '@features/onboarding/ui';
import '@features/onboarding/styles/pagination.css';

const OnboardingPage = () => {
  const [isAlertOpened, setIsAlertOpened] = useState(true);

  useResizeHeight();

  return (
    <StyledContainer>
      <Swiper
        pagination
        modules={[Pagination]}
        onSliderFirstMove={() => {
          if (isAlertOpened) {
            setIsAlertOpened(false);
          }
        }}
        css={css`
          width: 100%;
          height: 100%;
        `}>
        <SwiperSlide>
          <Step1 />
        </SwiperSlide>
        <SwiperSlide>
          <Step2 />
        </SwiperSlide>
        <SwiperSlide>
          <Step3 />
        </SwiperSlide>
        <SwiperSlide>
          <Step4 />
        </SwiperSlide>
        <SwiperSlide>
          <Step5 />
        </SwiperSlide>
      </Swiper>

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

      {/* <Link to={GOOGLE_LOGIN_URL}>
        <div
          css={css`
            position: absolute;
            bottom: 15rem;
            z-index: 10;
          `}>
          구글로 계속하기
        </div>
      </Link> */}

      <Link to={KAKAO_LOGIN_URL}>
        <StyledButton>
          <SvgIcon id="kakao" /> 카카오로 계속하기
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  width: 37.5rem;
  height: calc(var(--vh) * 100);
  margin-left: -2rem;
  overflow: hidden;

  ${media.mobile} {
    width: 100vw;
  }
`;

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
  z-index: 1;
`;

const StyledIcon = styled.div`
  position: absolute;
  bottom: -1.2rem;
`;

const StyledButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 4rem;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: calc(37.5rem - 4rem);
  padding: 1.8rem 0;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.palette.kakao_yellow};
  ${(props) => props.theme.typo.BM3}
  color: ${(props) => props.theme.palette.black};
  gap: 1rem;
  transition: opacity 0.1s ease-in-out;
  z-index: 1;

  ${media.mobile} {
    max-width: calc(100% - 4rem);
  }
`;

export default OnboardingPage;
