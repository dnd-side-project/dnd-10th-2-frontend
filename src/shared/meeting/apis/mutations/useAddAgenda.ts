import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  AddAgendaRequest,
  AddAgendaResponse
} from '@shared/meeting/apis/types';

export const useAddAgenda = ({
  token,
  meetingId,
  title,
  type,
  duration,
  onSuccess
}: AddAgendaRequest) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const {
        data: { response }
      } = await api.post<AddAgendaResponse>(
        `/api/meetings/${meetingId}/agendas`,
        {
          title,
          type,
          allocatedDuration: duration
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
    onSuccess: () => {
      onSuccess();
    }
  });

  return { mutate };
};
