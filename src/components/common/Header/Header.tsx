import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  return <StyledHeader>{children}</StyledHeader>;
};

const HeaderLeft = ({ children }: PropsWithChildren) => (
  <StyledHeaderLeft>{children}</StyledHeaderLeft>
);

const HeaderRight = ({ children }: PropsWithChildren) => (
  <StyledHeaderRight>{children}</StyledHeaderRight>
);

const HeaderCenter = ({ children }: PropsWithChildren) => (
  <StyledHeaderCenter>{children}</StyledHeaderCenter>
);

const StyledHeader = styled.header`
  ${(props) => props.theme.typo.T7}
  color: ${(props) => props.theme.palette.dark_gray1};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 5.6rem;
  padding: 0 2rem;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  /* background-color: indianred; */
`;

const StyledHeaderRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  /* background-color: indianred; */
`;

const StyledHeaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: tomato; */
`;

Header.Left = HeaderLeft;
Header.Right = HeaderRight;
Header.Center = HeaderCenter;
