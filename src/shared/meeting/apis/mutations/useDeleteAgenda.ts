import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type { DeleteAgendaRequest } from '@shared/meeting/apis/types';

export const useDeleteAgenda = ({
  token,
  meetingId,
  agendaId,
  onSuccess
}: DeleteAgendaRequest) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const {
        data: { response }
      } = await api.delete(`/api/meetings/${meetingId}/agendas/${agendaId}`, {
        headers: {
          Authorization: token
        }
      });

      return response;
    },
    onError: () => {
      console.log('error');
    },
    onSuccess
  });

  return { mutate };
};
