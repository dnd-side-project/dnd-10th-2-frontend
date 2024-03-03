import styled from '@emotion/styled';
import { SvgIcon } from '@/components/common/SvgIcon/SvgIcon';

interface HeaderProps {
  title?: string;
  iconLeftId?: 'arrow_left' | 'hamburger_menu';
  iconRightId1?: 'x' | 'memo';
  iconRightId2?: 'share';
  onClickIconLeft?: () => void;
  onClickIconRight1?: () => void;
  onClickIconRight2?: () => void;
}

/**
 * Header 컴포넌트 props 리스트
 * @default {HTMLHeaderElement}
 *
 * @param {string} [title]  제목
 * @param {string} [iconLeftId] 왼쪽 아이콘('arrow_left' | 'hamburger_menu')
 * @param {string} [iconRightId1] 오른쪽 아이콘 1('x' | 'memo')
 * @param {string} [iconRightId2] 오늘쪽 아이콘 2('share')
 * @param {() => void} [onClickIconLeft] 왼쪽 아이콘 클릭 시 발생하는 handler
 * @param {() => void} [onClickIconRight1] 오른쪽 아이콘 1 클릭 시 발생하는 handler
 * @param {() => void} [onClickIconRight2] 오른쪽 아이콘 2 클릭 시 발생하는 handler
 */
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
  width: 100%;
  height: 5.6rem;

  svg {
    cursor: pointer;
  }
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledIconLeft = styled.div`
  position: absolute;
  left: 0rem;
  display: flex;
`;

const StyledIconRight = styled.div`
  position: absolute;
  right: 0rem;
  display: flex;
  gap: 1rem;
`;
