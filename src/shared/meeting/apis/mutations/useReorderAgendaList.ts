import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  ReorderAgendaListRequest,
  ReorderAgendaListResponse
} from '@shared/meeting/apis/types';

export const useReorderAgendaList = ({
  token,
  meetingId
}: ReorderAgendaListRequest) => {
  const { mutate } = useMutation({
    mutationFn: async ({ agendaIds }: { agendaIds: number[] }) => {
      const {
        data: { response }
      } = await api.patch<ReorderAgendaListResponse>(
        `/api/meetings/${meetingId}/agendas/order`,
        {
          agendaIds
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
    }
    // onSuccess: () => {}
  });

  return { mutate };
};
