/**
 * HH:mm:ss 형식의 시간으로부터 시간과 분을 가져오는 함수
 * @param {string} timeString - HH:mm:ss 형식의 시간 문자열
 * @returns {{ hour: number, minute: number }} - 시간과 분
 */
export const formatTimeToHourMinute = (timeString: string) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour: Number(hour), minute: Number(minute) };
};
