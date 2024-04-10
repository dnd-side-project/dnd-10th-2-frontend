import { KeyOfPalette } from '@/styles';
import styled from '@emotion/styled';

export type Size = 'lg' | 'md' | 'sm';

interface ButtonProps {
  children: React.ReactNode;
  size: Size;
  fullWidth?: boolean;
  backgroundColor: KeyOfPalette;
  textColor?: KeyOfPalette;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  size,
  fullWidth = true,
  backgroundColor,
  textColor = 'white',
  disabled = false,
  onClick
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      fullWidth={fullWidth}
      backgroundColor={backgroundColor}
      textColor={textColor}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  size: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  backgroundColor: KeyOfPalette;
  textColor: KeyOfPalette;
  disabled?: boolean;
}>`
  ${(props) =>
    props.size === 'lg'
      ? props.theme.typo.BL
      : props.size === 'md'
        ? props.theme.typo.BM1
        : props.theme.typo.BM3}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  padding: 1.4rem 0;
  border-radius: 1.2rem;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.light_gray3
      : props.theme.palette[props.backgroundColor]};
  color: ${(props) => props.theme.palette[props.textColor]};
  transition: opacity 0.1s ease-in-out;
  /* &:hover,
  &:focus {
    opacity: 0.8;
  } */
`;
