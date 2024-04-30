interface DateProps {
  year: number;
  month: number;
  date: number;
}

interface TimeProps {
  periodOfDay: string | undefined;
  hour: string;
  minute: string;
}

export const formatMeetingDateTime = (date: DateProps, time: TimeProps) => {
  const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.date).padStart(2, '0')}`;
  const formattedTime = `${String(Number(time.hour) + (time.periodOfDay === '오후' ? 12 : 0)).padStart(2, '0')}:${time.minute}:00`;

  return `${formattedDate}T${formattedTime}`;
};
