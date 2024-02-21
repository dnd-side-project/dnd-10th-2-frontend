import { BASE_URL } from '@/constants';
import { api } from '../axois';

export const userApi = {
  // 카카오 로그인
  kakaoLogin: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/join`,
  // 유저 조회
  getInfo: (token: string) =>
    api.get('/api/members', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  // 닉네임 추가
  addNickname: (token: string) =>
    api.patch('/api/members/nickname', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};
