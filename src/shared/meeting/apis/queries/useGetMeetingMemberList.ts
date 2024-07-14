import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  GetMeetingMemberListRequest,
  GetMeetingMemberListResponse
} from '@shared/meeting/apis/types';

export const useGetMeetingMemberList = ({
  meetingId,
  token
}: GetMeetingMemberListRequest) => {
  const { data } = useQuery({
    queryKey: ['meetingMemberList', meetingId],
    queryFn: async () => {
      const {
        data: { response }
      } = await api.get<GetMeetingMemberListResponse>(
        `/api/meetings/${meetingId}/users`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      return response;
    }
  });

  return { data };
};
