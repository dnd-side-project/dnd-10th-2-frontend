import { BASE_URL } from '@shared/common/constants';

export const REDIRECT_URI = 'http://localhost:5173/join';
export const KAKAO_LOGIN_URL = `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;
export const GOOGLE_LOGIN_URL = `${BASE_URL}/oauth2/authorization/google?redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;
