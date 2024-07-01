import type { Date, Time } from '@features/meeting-create/types';

export const formatDateTime = (date: Date, time: Time) => {
  const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.date).padStart(2, '0')}`;
  const formattedTime = `${String(Number(time.hour) + (time.periodOfDay === '오후' ? 12 : 0)).padStart(2, '0')}:${time.minute}:00`;

  return `${formattedDate}T${formattedTime}`;
};
