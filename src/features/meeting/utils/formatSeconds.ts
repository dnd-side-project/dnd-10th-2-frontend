export const formatSeconds = (seconds: number): string => {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 시, 분, 초를 두 자리로 표시하도록 포맷팅합니다.
  const formattedHours: string = String(hours).padStart(2, '0');
  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
