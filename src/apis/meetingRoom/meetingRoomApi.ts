import { api } from '../axois';
import { CreateMeetingRoomRequest, CreateMeetingRoomResponse } from './types';

export const meetingRoomApi = {
  // 회의실 만들기
  CREATE_MEETING_ROOM: async ({
    token,
    title,
    location,
    startTime,
    description,
    estimatedTotalDuration,
    imageNum
  }: CreateMeetingRoomRequest) => {
    const {
      data: { response }
    } = await api.post<CreateMeetingRoomResponse>(
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
  }
};
