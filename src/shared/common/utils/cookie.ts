import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string) => {
  return cookies.set(key, value);
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  return cookies.remove(key, { path: '/' });
};
