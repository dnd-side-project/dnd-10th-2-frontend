import styled from '@emotion/styled';
import { SvgIcon } from '../SvgIcon';

interface HeaderProps {
  title?: string;
  iconLeftId?: 'arrow_left' | 'hamburger_menu';
  iconRightId1?: 'x' | 'memo';
  iconRightId2?: 'share';
  onClickIconLeft?: () => void;
  onClickIconRight1?: () => void;
  onClickIconRight2?: () => void;
}

export const Header = ({
  title,
  iconLeftId,
  iconRightId1,
  iconRightId2,
  onClickIconLeft,
  onClickIconRight1,
  onClickIconRight2
}: HeaderProps) => {
  return (
    <StyledHeader>
      <StyledIconLeft>
        {iconLeftId && <SvgIcon id={iconLeftId} onClick={onClickIconLeft} />}
      </StyledIconLeft>

      <StyledTitle>{title}</StyledTitle>

      <StyledIconRight>
        {iconRightId1 && (
          <SvgIcon id={iconRightId1} onClick={onClickIconRight1} />
        )}
        {iconRightId2 && (
          <SvgIcon id={iconRightId2} onClick={onClickIconRight2} />
        )}
      </StyledIconRight>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  ${(props) => props.theme.typo.T7}
  color: ${(props) => props.theme.palette.dark_gray1};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.6rem;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledIconLeft = styled.div`
  position: absolute;
  left: 2rem;
  display: flex;
`;

const StyledIconRight = styled.div`
  position: absolute;
  right: 2rem;
  display: flex;
  gap: 1rem;
`;
