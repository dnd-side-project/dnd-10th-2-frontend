import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/common/api';
import type {
  GetAgendaListRequest,
  GetAgendaListResponse
} from '@shared/meeting/apis/types';

export const useGetAgendaList = ({
  meetingId,
  token
}: GetAgendaListRequest) => {
  const { data, refetch } = useQuery({
    queryKey: ['agendaList', meetingId],
    queryFn: async () => {
      const {
        data: { response }
      } = await api.get<GetAgendaListResponse>(
        `/api/meetings/${meetingId}/agendas`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      return response;
    }
  });

  return { data, refetch };
};
