import { Drawer } from 'vaul';
import styled from '@emotion/styled';

import { useBottomSheet } from '@shared/common/hooks';

export const BottomSheet = () => {
  const {
    bottomSheet: { isOpened, content },
    closeBottomSheet
  } = useBottomSheet();
  return (
    <Drawer.Root open={isOpened}>
      <Drawer.Portal>
        <StyledOverlay />
        <StyledContent
          onPointerDownOutside={closeBottomSheet}
          onCloseAutoFocus={isOpened ? closeBottomSheet : () => null}>
          <Drawer.Title />
          <Drawer.Description />

          <StyledBar />
          {content}
        </StyledContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const StyledOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: calc(34.2rem + 4.8rem);
  z-index: 99;
`;

const StyledContent = styled(Drawer.Content)`
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 1rem 2rem 4.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 1rem 1rem 0 0;
  max-width: calc(34.2rem + 4.8rem);
  outline: none;
`;

const StyledBar = styled.div`
  width: 5rem;
  height: 0.4rem;
  border-radius: 1rem;
  background-color: #e1e1e5;
  margin-bottom: 3rem;
`;
