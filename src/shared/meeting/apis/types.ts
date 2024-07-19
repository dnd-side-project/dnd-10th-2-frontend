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

export interface GetMeetingRequest {
  token: string | null;
  meetingId: string;
}

export interface GetMeetingResponse {
  response: {
    meetingId: number;
    title: string;
    description: string;
    meetingStatus: string;
    hostMemberId: number;
    startTime: string;
    totalEstimatedDuration: string; // 회의 예상 소요시간
    currentDuration: string; // 회의 실제 소요시간
    imgNum: number;
  };
}

export interface GetMeetingMemberListRequest {
  token: string | null;
  meetingId: string;
}

export interface MeetingMemberResponse {
  memberId: string;
  nickname: string;
  imageNum: number;
}

export interface GetMeetingMemberListResponse {
  response: {
    hostMember: {
      memberId: string;
      nickname: string;
      imageNum: number;
    };
    members: MeetingMemberResponse[];
    host: boolean; // 방장 여부
  };
}

export interface GetAgendaListRequest {
  token: string | null;
  meetingId: string;
}

export interface AgendaResponse {
  agendaId: number;
  title: string;
  type: 'AGENDA' | 'BREAK';
  currentDuration: string;
  remainingDuration: string;
  status: 'PENDING' | 'INPROGRESS' | 'PAUSED' | 'COMPLETED';
}

export interface GetAgendaListResponse {
  response: {
    meetingId: number;
    currentDuration: string; // 현재까지 회의 소요시간
    agendaResponse: AgendaResponse[];
  };
}

export interface AddAgendaRequest {
  token: string | null;
  meetingId: string;
  title: string;
  type: 'AGENDA' | 'BREAK'; // 안건이면 AGENDA, 쉬는시간이면 BREAK
  duration: string;
  onSuccess: () => void;
}

export interface AddAgendaResponse {
  response: {
    agendaId: number;
  };
}

export interface DeleteAgendaRequest {
  token: string | null;
  meetingId: string;
  agendaId: string;
  onSuccess: () => void;
}

export interface ReorderAgendaListRequest {
  token: string | null;
  meetingId: string;
  // agendaIds: number[];
}

export interface ReorderAgendaListResponse {
  response: {
    meetingId: number;
    remainingTime: string; // 현재까지 회의 소요시간
    agendaResponse: AgendaResponse[];
  };
}
