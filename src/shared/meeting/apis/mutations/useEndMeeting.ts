import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  EndMeetingRequest,
  EndMeetingResponse
} from '@shared/meeting/apis/types';
import { useNavigate } from 'react-router-dom';

export const useEndMeeting = ({ token, meetingId }: EndMeetingRequest) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const {
        data: { response }
      } = await api.patch<EndMeetingResponse>(
        `/api/meetings/${meetingId}/end`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );

      return response;
    },
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: () => {
      navigate(`/meeting/${meetingId}/complete`);
    }
  });

  return { mutate };
};
