import { useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper as SwiperRef, SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import type { Time } from '@shared/common/types';

interface TimePickerProps {
  type: 'duration' | 'time';
  initialTime?: { hour: number; minute: number };
  setTime: ({ periodOfDay, hour, minute }: Time) => void;
  onClose?: () => void;
}

export const TimePicker = ({
  type = 'duration',
  initialTime = { hour: 0, minute: 0 },
  setTime,
  onClose
}: TimePickerProps) => {
  const [swiperRef, setSwiperRef] = useState<{
    swiper1: SwiperRef | null;
    swiper2: SwiperRef | null;
    swiper3: SwiperRef | null;
  }>({
    swiper1: null,
    swiper2: null,
    swiper3: null
  });
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
    },
    loopAdditionalSlides: 5
  };

  const getHourList = () => {
    if (type === 'duration') {
      const hourList = [...Array(24)].map((_, index) => index);
      return [
        ...hourList.slice(initialTime.hour, hourList.length),
        ...hourList.slice(0, initialTime.hour)
      ];
    }

    if (type === 'time') {
      return [...Array(12)].map((_, index) => index + 1);
    }

    return [];
  };

  const getMinuteList = () => {
    const minuteList = [...Array(60)].map(
      (_, index) => (index < 10 ? '0' : '') + index
    );
    return [
      ...minuteList.slice(initialTime.minute, minuteList.length),
      ...minuteList.slice(0, initialTime.minute)
    ];
  };

  const getTime = () => {
    const { swiper1, swiper2, swiper3 } = swiperRef;
    const hour = swiper2?.slides[swiper2?.activeIndex].innerText as string;
    const minute = swiper3?.slides[swiper3?.activeIndex].innerText as string;

    switch (type) {
      case 'duration': {
        return { periodOfDay: undefined, hour, minute };
      }
      case 'time': {
        const periodOfDay = swiper1?.slides[swiper1?.activeIndex].innerText;
        return { periodOfDay, hour, minute };
      }
    }
  };

  const handleComplete = () => {
    setTime(getTime());
    onClose?.();
  };
  return (
    <StyledTimePicker>
      {onClose && <StyledButton onClick={handleComplete}>완료</StyledButton>}

      {type === 'time' && (
        <StyledTimeList type={type}>
          <Swiper
            onSwiper={(swiper) =>
              setSwiperRef((prev) => ({ ...prev, swiper1: swiper }))
            }
            onRealIndexChange={() => setTime(getTime())}
            {...swiperSettings}>
            {['오전', '오후'].map((value) => (
              <SwiperSlide key={value}>{value}</SwiperSlide>
            ))}
          </Swiper>
        </StyledTimeList>
      )}

      <StyledTimeList>
        <Swiper
          onSwiper={(swiper) =>
            setSwiperRef((prev) => ({ ...prev, swiper2: swiper }))
          }
          loop={true}
          onRealIndexChange={() => setTime(getTime())}
          {...swiperSettings}>
          {getHourList().map((hour) => (
            <SwiperSlide key={hour}>{hour}</SwiperSlide>
          ))}
        </Swiper>

        <StyledText>
          {type === 'duration' ? '시간' : '시 \u00A0 \u00A0'}
        </StyledText>
      </StyledTimeList>

      <StyledTimeList>
        <Swiper
          onSwiper={(swiper) =>
            setSwiperRef((prev) => ({ ...prev, swiper3: swiper }))
          }
          loop={true}
          onRealIndexChange={() => setTime(getTime())}
          {...swiperSettings}>
          {getMinuteList().map((minute) => (
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

  .swiper {
    width: 100%;
    height: 100%;
  }
`;

const StyledButton = styled.button`
  ${({ theme }) => theme.typo.B2}
  color: ${({ theme }) => theme.palette.main_blue};
  position: absolute;
  top: 1.2rem;
  right: 1.6rem;
`;

const StyledTimeList = styled.div<{ type?: 'duration' | 'time' }>`
  ${({ theme }) => theme.typo.T7}
  position: relative;
  width: ${({ type }) => (type === 'time' ? 'auto' : '8rem')};
  height: 18rem;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c7ccd6;
    font-weight: 400;
  }

  .swiper-slide-active {
    color: #646e81;
    font-weight: 600;
  }
`;

const StyledText = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.middle_gray3};
`;
