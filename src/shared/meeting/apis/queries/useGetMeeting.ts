import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  GetMeetingRequest,
  GetMeetingResponse
} from '@shared/meeting/apis/types';

export const useGetMeeting = ({ meetingId, token }: GetMeetingRequest) => {
  const { data } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: async () => {
      const {
        data: { response }
      } = await api.get<GetMeetingResponse>(`/api/meetings/${meetingId}`, {
        headers: {
          Authorization: token
        }
      });

      return response;
    }
  });

  return { data };
};
