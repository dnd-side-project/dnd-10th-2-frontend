interface DurationProps {
  hour: string;
  minute: string;
}

export const formatDuration = (duration: DurationProps) => {
  return `${duration.hour.padStart(2, '0')}:${duration.minute}:00`;
};
