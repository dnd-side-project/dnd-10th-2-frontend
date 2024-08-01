import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface HeaderLeftProps {
  children: ReactNode | string;
}
const HeaderLeft = ({ children }: HeaderLeftProps) => {
  return <StyledHeaderLeft>{children}</StyledHeaderLeft>;
};

interface HeaderCenterProps {
  children: ReactNode | string;
}
const HeaderCenter = ({ children }: HeaderCenterProps) => {
  return <StyledHeaderCenter>{children}</StyledHeaderCenter>;
};

interface HeaderRightProps {
  children: ReactNode | string;
}
const HeaderRight = ({ children }: HeaderRightProps) => {
  return <StyledHeaderRight>{children}</StyledHeaderRight>;
};

interface HeaderMainProps {
  children?: ReactNode;
}
const HeaderMain = ({ children }: HeaderMainProps) => {
  return <StyledHeaderMain>{children}</StyledHeaderMain>;
};

export const Header = Object.assign(HeaderMain, {
  Left: HeaderLeft,
  Center: HeaderCenter,
  Right: HeaderRight
});

const StyledHeaderLeft = styled.div`
  position: absolute;
  left: 0rem;
  display: flex;
`;

const StyledHeaderCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledHeaderRight = styled.div`
  position: absolute;
  right: 0rem;
  display: flex;
  gap: 1rem;
`;

const StyledHeaderMain = styled.div`
  ${(props) => props.theme.typo.T7}
  color: ${(props) => props.theme.palette.dark_gray1};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.6rem;

  svg {
    cursor: pointer;
  }
`;
