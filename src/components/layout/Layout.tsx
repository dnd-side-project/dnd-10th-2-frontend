import styled from '@emotion/styled';
import { Flex } from '../Wrapper';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      {/* Header */}
      <Wrapper>{children}</Wrapper>
    </Flex>
  );
};

const Wrapper = styled(Flex)`
  width: 375px;
`;
