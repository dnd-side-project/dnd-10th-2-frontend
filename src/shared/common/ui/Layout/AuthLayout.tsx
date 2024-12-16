import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '@shared/common/utils';

interface AuthLayoutProps {
  auth: boolean;
  children: ReactNode;
}

export const AuthLayout = ({ auth, children }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const token = getCookie('token');

  useEffect(() => {
    if (auth && !token) {
      navigate('/onboarding');
      return;
    }

    if (!auth && token) {
      navigate('/');
      return;
    }
  }, [auth, token, navigate]);

  return <>{children}</>;
};
