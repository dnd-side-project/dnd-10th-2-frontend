/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles';
import { Flex } from '@/components/Wrapper';
import Picker from 'react-mobile-picker-scroll';

export interface TimePickerValueGroups {
  hour: number;
  minute: number;
}

interface TimePickerOptionGroups {
  hour: number[];
  minute: number[];
}

interface TimePickerProps {
  value: TimePickerValueGroups;
  setValue: (value: TimePickerValueGroups) => void;
}

export const TimePicker = ({ value, setValue }: TimePickerProps) => {
  const [valueGroups, setValueGroups] = useState<TimePickerValueGroups>(value);

  const [optionGroups, setOptionGroups] = useState<TimePickerOptionGroups>({
    hour: Array.from(new Array(24), (_, index) => index),
    minute: Array.from(new Array(60), (_, index) => index)
  });

  const handleChange = (name: keyof TimePickerValueGroups, value: string) => {
    setValueGroups({
      ...valueGroups,
      [name]: value
    });
    setValue({
      ...valueGroups,
      [name]: value
    });
  };

  return (
    <Wrapper>
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
      />
      <HighlightBox>
        <Flex gap={38}>
          <span>시간</span>
          <span>분</span>
        </Flex>
      </HighlightBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  width: 100%;

  ${theme.typo.T7};
  color: ${theme.palette.middle_gray3};

  .picker-container {
    width: 100%;
    background-color: ${theme.palette.light_white};
    border-radius: 8px;
    display: flex;
    justify-content: center;
  }

  .picker-inner {
    position: relative;
    z-index: 5;

    width: auto;
    padding: 0;

    gap: 46px;
  }

  .picker-column,
  .picker-item {
    width: 20px;

    display: flex;
    justify-content: center;
  }

  .picker-highlight {
    width: 375px;
    height: 40px;
    background-color: ${theme.palette.white};
    left: -50px;

    display: none;
  }

  .picker-item {
    padding: 0px !important;
    width: 22px;
    color: ${theme.palette.light_gray3} !important;
    ${theme.typo.T7};
    font-weight: 400;
  }

  .picker-item-selected {
    color: ${theme.palette.middle_gray3} !important;
    ${theme.typo.T7};
  }
`;

const HighlightBox = styled.div`
  width: 100%;
  position: absolute;

  height: 40px;
  background-color: ${theme.palette.white};

  top: 50%;
  transform: translate(0, -50%) !important;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 80px;
    margin-left: 46px;
  }
`;
