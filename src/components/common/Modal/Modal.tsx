import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

export const Modal = () => {
  const content = (
    <StyledOverlay>
      <StyledModal>Modal</StyledModal>
    </StyledOverlay>
  );

  const el = document.getElementById('modal');
  if (!el) return null;
  return createPortal(content, el);
};

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 17, 28, 0.6);
  padding: 0 2rem;
  z-index: 99;
  box-sizing: border-box;
`;

const StyledModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2.8rem 2.6rem;
  background-color: white;
  border-radius: 1.6rem;
  gap: 1.5rem;
  box-sizing: border-box;
`;
