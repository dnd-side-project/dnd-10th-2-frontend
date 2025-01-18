import { delay, http } from 'msw';
import * as meetingList from './meetingList';

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  ...Object.values(meetingList)
];
