import styled from '@emotion/styled';

interface ToastProps {
  children: React.ReactNode;
  bottom: number;
}

export const Toast = ({ children, bottom }: ToastProps) => {
  return <StyledToast bottom={bottom}>{children}</StyledToast>;
};

const StyledToast = styled.div<{ bottom: number }>`
  ${({ theme }) => theme.typo.T7}
  color: ${({ theme }) => theme.palette.white};
  position: absolute;
  bottom: ${({ bottom }) => bottom}rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: calc(100vw - 1.9rem);
  height: 5.2rem;
  padding: 0 2.4rem;
  background-color: #1c2c58cc;
  border-radius: 1.6rem;
  gap: 1.6rem;
`;
