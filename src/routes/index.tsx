import App from '@/App';
import { LoginLayout } from '@/components/layout';
import Join from '@/pages/join';
import JoinComplete from '@/pages/join/complete';
import { MeetingRoom } from '@/pages/meetingroom';

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
    path: '/meetingroom/:meetingId',
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
