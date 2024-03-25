import { useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { type Swiper as SwiperRef } from 'swiper';
import { SwiperOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './styles.css';

const hourList = [...Array(24)].map((_, index) => index);
const minuteList = [...Array(60)].map(
  (_, index) => (index < 10 ? '0' : '') + index
);

export const TimePicker = () => {
  const swiperSettings: SwiperOptions = {
    modules: [EffectCoverflow],
    direction: 'vertical',
    slidesPerView: 5,
    centeredSlides: true,
    effect: 'coverflow',
    grabCursor: true,
    coverflowEffect: {
      rotate: 25,
      depth: 50,
      slideShadows: false
    }
  };

  const [swiper1Ref, setSwiper1Ref] = useState<SwiperRef | null>(null);
  const [swiper2Ref, setSwiper2Ref] = useState<SwiperRef | null>(null);

  const handleComplete = () => {
    console.log(swiper1Ref?.realIndex, swiper2Ref?.realIndex);
  };
  return (
    <StyledTimePicker>
      <StyledButton onClick={handleComplete}>완료</StyledButton>

      <StyledTimeList>
        <Swiper onSwiper={setSwiper1Ref} loop={true} {...swiperSettings}>
          {hourList.map((hour) => (
            <SwiperSlide key={hour}>{hour}</SwiperSlide>
          ))}
        </Swiper>

        <StyledText>시간</StyledText>
      </StyledTimeList>

      <StyledTimeList>
        <Swiper onSwiper={setSwiper2Ref} loop={true} {...swiperSettings}>
          {minuteList.map((minute) => (
            <SwiperSlide key={minute}>{minute}</SwiperSlide>
          ))}
        </Swiper>

        <StyledText>분 &nbsp;&nbsp;</StyledText>
      </StyledTimeList>
    </StyledTimePicker>
  );
};

const StyledTimePicker = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  background: linear-gradient(#f6f7f9 40%, #fff 40%, #fff 60%, #f6f7f9 60%);
  padding: 1rem 0 1rem 0;
  border-radius: 0.8rem;

  margin-top: 4rem;
`;

const StyledButton = styled.button`
  ${({ theme }) => theme.typo.B2}
  color: ${({ theme }) => theme.palette.main_blue};
  position: absolute;
  top: 1rem;
  right: 1.5rem;
`;

const StyledTimeList = styled.div`
  ${({ theme }) => theme.typo.T7}
  position: relative;
  width: 8rem;
  height: 18rem;
`;

const StyledText = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.middle_gray3};
`;
