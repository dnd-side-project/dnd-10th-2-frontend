import { api } from '../axois';

export const meetingRoomApi = {
  // 회의실 만들기
  CREATE_MEETING_ROOM: ({
    token,
    title,
    location,
    startTime,
    description,
    estimatedTotalDuration,
    imageNum
  }: {
    token: string;
    title: string;
    location?: string;
    startTime: string;
    description?: string;
    estimatedTotalDuration: string;
    imageNum: number;
  }) =>
    api.post(
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
    )
};
