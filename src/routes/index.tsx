// import App from '@/App';
import { LoginLayout } from '@shared/common/ui';

import MainPage from '@pages/main/MainPage';

import Onboarding from '@pages/onboarding/OnboardingPage';

import Join from '@pages/join/JoinPage';
import JoinComplete from '@pages/join/JoinCompletePage';

import MeetingCreatePage from '@pages/meeting/MeetingCreatePage';
import MeetingPage from '@pages/meeting/MeetingPage';
import MeetingCompletePage from '@pages/meeting/MeetingCompletePage';

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
    element: <MainPage />,
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
    path: '/meeting/create',
    element: <MeetingCreatePage />,
    auth: true
  },
  {
    path: '/meeting/:meetingId',
    element: <MeetingPage />,
    auth: true
  },
  {
    path: '/meeting/:meetingId/complete',
    element: <MeetingCompletePage />,
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
