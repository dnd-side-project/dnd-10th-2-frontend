import { useMutation } from '@tanstack/react-query';
import { meetingRoomApi } from './meetingRoomApi';
import { getCookie } from '@/utils/getCookie';
import { useNavigate } from 'react-router-dom';

interface UseCreateMeetingRoomProps {
  title: string;
  description: string;
  imageNum: number;
  startTime: string;
  estimatedTotalDuration: string;
  location: string;
}

export const useCreateMeetingRoom = ({
  title,
  description,
  imageNum,
  startTime,
  estimatedTotalDuration,
  location
}: UseCreateMeetingRoomProps) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {
      return meetingRoomApi.CREATE_MEETING_ROOM({
        token: getCookie('token'),
        title,
        description,
        imageNum,
        startTime,
        estimatedTotalDuration,
        location
      });
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: ({ meetingId }) => {
      navigate(`/meeting-room/${meetingId}`);
    }
  });

  return { mutate };
};
