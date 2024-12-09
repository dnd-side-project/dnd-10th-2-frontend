import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { api } from '@shared/common/api';
import type {
  CreateMeetingRequest,
  CreateMeetingResponse
} from '@shared/meeting/apis/types';

export const useCreateMeeting = ({
  token,
  title,
  description,
  imageNum,
  startTime,
  estimatedTotalDuration,
  location
}: CreateMeetingRequest) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const {
        data: { response }
      } = await api.post<CreateMeetingResponse>(
        '/api/meetings',
        {
          title,
          location,
          startTime,
          description,
          estimatedTotalDuration,
          imageNum
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      return response;
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: ({ meetingId }) => {
      navigate(`/meeting/${meetingId}`);
    }
  });

  return { mutate };
};
