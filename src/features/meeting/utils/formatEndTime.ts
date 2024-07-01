import { DateTime } from 'luxon';

export const formatEndTime = (date: DateTime, seconds: number): string => {
  const newDate = date.plus({ seconds: seconds });
  return newDate
    .toFormat('a hh:mm')
    .replace('AM', '오전')
    .replace('PM', '오후');
};
