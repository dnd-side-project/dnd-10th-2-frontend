import { api } from '@shared/common/api';
import type { GetUserInfoResponse } from '@shared/join/apis/types';

export const useGetUserInfo = async (token: string) => {
  const {
    data: { response }
  } = await api.get<GetUserInfoResponse>('/api/members', {
    headers: {
      Authorization: token
    }
  });

  return response;
};
