import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import {
  GetMeetingListRequest,
  GetMeetingListResponse
} from '@shared/main/apis/types';

export const useGetMeetingList = ({ status, token }: GetMeetingListRequest) => {
  const { data } = useQuery({
    queryKey: ['meeting-list', status],
    queryFn: async () => {
      const {
        data: { response }
      } = await api.get<GetMeetingListResponse>(`/api/meetings/${status}`, {
        headers: {
          Authorization: token
        }
      });

      return response;
    }
  });

  return { data };
};
