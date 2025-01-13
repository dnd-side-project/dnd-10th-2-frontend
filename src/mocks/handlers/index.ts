import {
  getMeetingListOngoing,
  getMeetingListUpcoming,
  getMeetingListConcluded
} from './meetingList';

export const handlers = [
  ...Object.values(getMeetingListOngoing),
  ...Object.values(getMeetingListUpcoming),
  ...Object.values(getMeetingListConcluded)
];
