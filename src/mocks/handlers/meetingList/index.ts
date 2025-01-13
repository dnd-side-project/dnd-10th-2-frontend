import { http, HttpResponse } from 'msw';

export const getMeetingListOngoing = http.get('/api/meetings/ongoing', () => {
  return HttpResponse.json({
    success: true,
    response: [
      {
        meetingId: 0,
        title: '진행중 회의 1 제목',
        description: '진행중 회의 1 설명',
        details: { startTime: '2025-01-12T09:00:00' }
      }
    ],
    error: null
  });
});

export const getMeetingListUpcoming = http.get('/api/meetings/upcoming', () => {
  return HttpResponse.json({
    success: true,
    response: [
      {
        meetingId: 0,
        title: '예정된 회의 1 제목',
        description: '예정된 회의 1 설명',
        details: { currentAgenda: '안건 1', elapsedTime: '00:10:00' }
      },
      {
        meetingId: 1,
        title: '예정된 회의 2 제목',
        description: '예정된 회의 2 설명',
        details: { currentAgenda: '안건 1', elapsedTime: '00:10:00' }
      },
      {
        meetingId: 2,
        title: '예정된 회의 3 제목',
        description: '예정된 회의 3 설명',
        details: { currentAgenda: '안건 1', elapsedTime: '00:10:00' }
      },
      {
        meetingId: 3,
        title: '예정된 회의 4 제목',
        description: '예정된 회의 4 설명',
        details: { currentAgenda: '안건 1', elapsedTime: '00:10:00' }
      },
      {
        meetingId: 4,
        title: '예정된 회의 5 제목',
        description: '예정된 회의 5 설명',
        details: { currentAgenda: '안건 1', elapsedTime: '00:10:00' }
      }
    ],
    error: null
  });
});

export const getMeetingListConcluded = http.get(
  '/api/meetings/concluded',
  () => {
    return HttpResponse.json({
      success: true,
      response: [
        {
          meetingId: 0,
          title: '종료된 회의 1 제목',
          description: '종료된 회의 1 설명',
          details: {
            endTime: '2024-12-30T11:00:00',
            retrospection: 'retrospection'
          }
        },
        {
          meetingId: 1,
          title: '종료된 회의 2 제목',
          description: '종료된 회의 2 설명',
          details: {
            endTime: '2024-12-30T11:00:00',
            retrospection: 'retrospection'
          }
        },
        {
          meetingId: 2,
          title: '종료된 회의 3 제목',
          description: '종료된 회의 3 설명',
          details: {
            endTime: '2024-12-30T11:00:00',
            retrospection: 'retrospection'
          }
        },
        {
          meetingId: 3,
          title: '종료된 회의 4 제목',
          description: '종료된 회의 4 설명',
          details: {
            endTime: '2024-12-30T11:00:00',
            retrospection: 'retrospection'
          }
        },
        {
          meetingId: 4,
          title: '종료된 회의 5 제목',
          description: '종료된 회의 5 설명',
          details: {
            endTime: '2024-12-30T11:00:00',
            retrospection: 'retrospection'
          }
        }
      ],
      error: null
    });
  }
);
