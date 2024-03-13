import { useState } from 'react';
import styled from '@emotion/styled';

const DatePicker = () => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate()
  };
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    date: number;
  }>({
    year: today.year,
    month: today.month,
    date: today.date
  });
  // 선택된 달의 전체 날짜 갯수
  const totalDateOfMonth: number = new Date(
    selectedDate.year,
    selectedDate.month,
    0
  ).getDate();
  // 선택된 달의 시작 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayOfMonth: number = new Date(
    selectedDate.year,
    selectedDate.month - 1,
    1
  ).getDay();

  const dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /**
   * 숫자 n을 입력받아 1부터 n까지의 array를 생성해 주는 함수
   * @param {number} n 입력 숫자
   * @returns {number[]} [1, 2, ... , n]
   */
  const createArray1ToN = (n: number) =>
    [...Array(n)].map((_, index) => index + 1);
  return (
    <StyledDatePicker>
      {/* 달력 헤더 영역(달, 년도, 화살표 아이콘) Start */}
      <StyledHeader>
        <StyledMonthYear>
          {selectedDate.month}월 {selectedDate.year}
        </StyledMonthYear>
      </StyledHeader>
      {/* 달력 헤더 영역(달, 년도, 화살표 아이콘) End */}

      {/* 요일 영역(SUN, MON, ... , SAT) Start */}
      <StyledDayList>
        {dayList.map((day: string) => (
          <StyledDay key={day}>{day}</StyledDay>
        ))}
      </StyledDayList>
      {/* 요일 영역(SUN, MON, ... , SAT) End */}

      {/* 날짜 영역 Start */}
      <StyledDateNumList>
        {/* 빈 칸 */}
        {createArray1ToN(firstDayOfMonth).map((index) => (
          <StyledDateNum key={index} isSelected={false} isToday={false} />
        ))}

        {/* 1 ~ 31 */}
        {createArray1ToN(totalDateOfMonth).map((date) => (
          <StyledDateNum
            key={date}
            onClick={() => setSelectedDate({ year: 0, month: 0, date: 0 })}
            isSelected={date === selectedDate.date}
            isToday={
              today.year === selectedDate.year &&
              today.month === selectedDate.month &&
              today.date === date
            }>
            {date}
          </StyledDateNum>
        ))}
      </StyledDateNumList>
      {/* 날짜 영역 End */}
    </StyledDatePicker>
  );
};

const StyledDatePicker = styled.div`
  width: 100%;
  color: ${(props) => props.theme.palette.dark_gray2};
  background-color: ${({ theme }) => theme.palette.light_white};
  border-radius: 0.8rem;
  padding: 2rem;
  box-sizing: border-box;

  margin-top: 4rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StyledMonthYear = styled.div`
  ${({ theme }) => theme.typo.B1}
`;

const StyledDayList = styled.div`
  ${({ theme }) => theme.typo.B7}
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 0.4rem;
`;

const StyledDay = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledDateNumList = styled.div`
  ${({ theme }) => theme.typo.B1}
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.4rem;
`;

const StyledDateNum = styled.div<{ isSelected: boolean; isToday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: ${({ isSelected, isToday, theme }) =>
    isSelected ? theme.palette.main_blue : isToday && theme.palette.skyblue};
  border-radius: 1.2rem;
  color: ${({ isSelected, isToday, theme }) =>
    isSelected ? theme.palette.white : isToday && theme.palette.main_blue};
  cursor: pointer;
`;

export default DatePicker;
