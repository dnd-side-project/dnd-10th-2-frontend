export interface Form {
  step1: {
    meetingRoomName: string;
    meetingRoomNotice: string;
    meetingThumbnail: string;
  };
  step2: {
    meetingRoomDate: {
      date: { year: number; month: number; date: number };
      dateString: string;
    };
    meetingRoomTime: {
      time: { periodOfDay: string; hour: string; minute: string };
      timeString: string;
    };
    meetingRoomDuration: {
      duration: { hour: string; minute: string };
      durationString: string;
    };
  };
  step3: {
    meetingRoomPlace: string;
  };
}
