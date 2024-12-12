export interface GetMeetingListRequest {
  token: string | null;
  status: 'ongoing' | 'upcoming' | 'concluded';
}

export interface GetMeetingListResponse {
  response: {
    meetingId: string;
    title: string;
    description: string;
    details: {
      // ongoing
      currentAgenda?: string;
      elapsedTime?: string;
      // upcoming
      startTime?: string;
      // concluded
      endTime?: string;
      retrospection?: string;
    };
  };
}
