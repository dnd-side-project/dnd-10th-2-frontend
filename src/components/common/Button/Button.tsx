import styled from '@emotion/styled';
import {
  BackgroundColor,
  BorderRadius,
  Height,
  TextColor,
  Typo
} from './types';

interface ButtonProps {
  text: string;
  typo: Typo;
  width: string;
  height: Height;
  backgroundColor: BackgroundColor;
  textColor: TextColor;
  borderRadius: BorderRadius;
  isFixed?: boolean;
}

export const Button = ({
  text,
  typo,
  width,
  height,
  backgroundColor,
  textColor,
  borderRadius,
  isFixed = false
}: ButtonProps) => {
  return (
    <StyledButton
      typo={typo}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderRadius={borderRadius}
      isFixed={isFixed}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  typo: Typo;
  width: string;
  height: Height;
  backgroundColor: BackgroundColor;
  textColor: TextColor;
  borderRadius: BorderRadius;
  isFixed: boolean;
}>`
  ${(props) =>
    props.isFixed &&
    `position: fixed;
     bottom: 44px;
     left: 50%;
     transform: translateX(-50%);
  `}
  ${(props) => props.theme.typo[props.typo]}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height / 10}rem;
  border-radius: ${(props) => props.borderRadius / 10}rem;
  background-color: ${(props) => props.theme.palette[props.backgroundColor]};
  color: ${(props) => props.theme.palette[props.textColor]};
  transition: opacity 0.1s ease-in-out;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;
