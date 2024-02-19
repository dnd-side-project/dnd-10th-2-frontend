import styled from '@emotion/styled';
import { Flex } from '../Wrapper';
import { ReactNode } from 'react';
import { theme } from '@/styles';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      {/* Header */}
      <Wrapper align="flex-start">{children}</Wrapper>
    </Flex>
  );
};

const Wrapper = styled(Flex)`
  min-height: 100vh;
  width: 375px;
<<<<<<< HEAD

  background-color: ${theme.palette.white};
=======
  padding: 0px 20px 0px 20px;
>>>>>>> 0dfcdd0 (✨ feat: Input 컴포넌트 (#14))
`;
