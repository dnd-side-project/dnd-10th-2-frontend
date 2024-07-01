export interface CreateMeetingRequest {
  token: string | null;
  title: string;
  location?: string;
  startTime: string;
  description?: string;
  estimatedTotalDuration: string;
  imageNum: number;
}

export interface CreateMeetingResponse {
  response: {
    meetingId: number;
    // is_time_exist: true;
    // shareUrl: 'generated_url';}
  };
}
