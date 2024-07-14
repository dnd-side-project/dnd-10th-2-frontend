/**
 * yyyy-mm-ddTHH:mm:ss 형식의 날짜를 'OO년 OO월 OO일'로 변환하는 함수
 * @param {string} timeString - yyyy-mm-ddTHH:mm:ss 형식의 날짜 문자열
 * @returns {number} - 문자열 형태의 날짜
 */
export const formatDateString = (dateString: string = '') => {
  const date = dateString.split('T')[0].split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2];
  return `${year}년 ${month}월 ${day}일`;
};
