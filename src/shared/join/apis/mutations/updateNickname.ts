import { api } from '@shared/common/api';

export const updateNickname = (nickname: string, token: string) =>
  api.patch(
    '/api/members/nickname',
    { nickname },
    {
      headers: {
        Authorization: token
      }
    }
  );
