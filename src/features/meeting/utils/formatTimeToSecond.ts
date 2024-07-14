/**
 * HH:mm:ss 형식의 시간을 초로 변환하는 함수
 * @param {string} timeString - HH:mm:ss 형식의 시간 문자열
 * @returns {number} - 초 단위의 시간
 */
export const formatTimeToSecond = (timeString: string) => {
  const [hour, minute, second] = timeString.split(':').map(Number);
  return hour * 3600 + minute * 60 + second;
};
