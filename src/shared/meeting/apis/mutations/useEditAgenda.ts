import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  EditAgendaRequest,
  EditAgendaResponse
} from '@shared/meeting/apis/types';

export const useEditAgenda = ({
  token,
  meetingId,
  agendaId,
  title,
  allocatedDuration,
  refetchAgendaList
}: EditAgendaRequest) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const {
        data: { response }
      } = await api.patch<EditAgendaResponse>(
        `/api/meetings/${meetingId}/agendas/${agendaId}`,
        {
          title,
          allocatedDuration
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
      refetchAgendaList();
    }
  });

  return { mutate };
};
