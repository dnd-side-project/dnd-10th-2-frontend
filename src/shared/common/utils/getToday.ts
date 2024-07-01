export const getToday = () => {
  return {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate()
  };
};
