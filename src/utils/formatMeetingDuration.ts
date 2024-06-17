interface DurationProps {
  hour: string;
  minute: string;
}

export const formatMeetingDuration = (duration: DurationProps) => {
  return `${duration.hour.padStart(2, '0')}:${duration.minute}:00`;
};
