import App from '@/App';
import { LoginLayout } from '@/components/layout';
import CreateMeetingRoom from '@/pages/createMeetingroom';
import Join from '@/pages/join';
import JoinComplete from '@/pages/join/complete';
import { MeetingRoom } from '@/pages/meetingRoom';
import Onboarding from '@/pages/onboarding';

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from 'react-router-dom';

type RouteChildren = {
  auth: boolean;
} & RouteObject;

const routeChildren: RouteChildren[] = [
  {
    path: '/',
    element: <App />,
    auth: false
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
    auth: false
  },
  {
    path: '/join',
    element: <Join />,
    auth: false
  },
  {
    path: '/join/complete',
    element: <JoinComplete />,
    auth: false
  },
  {
    path: '/create-meeting-room',
    element: <CreateMeetingRoom />,
    auth: true
  },
  {
    path: '/meeting-room/:meetingId',
    element: <MeetingRoom />,
    auth: true
  }
];

const browserRouter = routeChildren.map(({ path, element, auth }) => {
  return {
    path,
    element: auth ? <LoginLayout>{element}</LoginLayout> : element
  };
});

// TODO: error page, meta tag
const router = createBrowserRouter([
  {
    path: '/',
    // element:
    // errorElement:
    children: browserRouter
  }
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
