export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return cookieValue ? cookieValue.split('=')[1] : null;
};
