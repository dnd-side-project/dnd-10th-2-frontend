/**
 * yyyy-mm-dd 형식의 날짜에 대한 요일을 계산하는 함수
 * @param {string} yyyymmdd 날짜
 */
export const getDayOfWeek = (yyyymmdd: string) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(yyyymmdd).getDay()];
  return dayOfWeek;
};
