import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

import {
  ButtonWrapper,
  Flex,
  Space,
  Button,
  Header,
  ModalPortal
} from '@shared/common/ui';
import { media, theme } from '@shared/common/styles';
import { useOpen, useBottomSheet } from '@shared/common/hooks';
import { getCookie } from '@shared/common/utils';
import { AgendaResponse } from '@shared/meeting/apis/types';

import { useGetAgendaList } from '@shared/meeting/apis';

import {
  MeetingCard,
  TimeLineButton,
  Modal,
  Agenda,
  AgendaSheet,
  BreakTimeSheet
} from '@features/meeting/ui';
// import { api } from '@/shared/common/api';

const MeetingPage = () => {
  const { open, onOpen, onClose } = useOpen();
  const { openBottomSheet } = useBottomSheet();

  const { data, refetch } = useGetAgendaList({
    meetingId: '65',
    token: getCookie('token')
  });

  // console.log(data);

  const [agendaList, setAgendaList] = useState<AgendaResponse[]>([]);

  useEffect(() => {
    // console.log(data);
    setAgendaList(data?.agendaResponse || []);
  }, [data, refetch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(agendaList);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setAgendaList(reorderedItems);
  };

  // const handleDelete = async () => {
  //   try {
  //     const response = await api.delete(`/api/meetings/65/agendas/29`, {
  //       headers: {
  //         Authorization: `Bearer ${getCookie('token')}`
  //       }
  //     });
  //     await refetch();
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error deleting agenda:', error);
  //     throw error;
  //   }
  // };
  return (
    <Wrapper direction="column" justify="flex-start">
      {/* <button onClick={handleDelete}>삭제</button> */}
      {/* TODO Header onClick 핸들러 연결, background-color */}
      <Header iconLeftId="hamburger_menu" title="회의실" iconRightId2="share" />

      <Space height={10} />

      <MeetingCard />

      <Space height={20} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <StyledAgendaList
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {agendaList.map((agenda, index) =>
                agenda.status === 'COMPLETED' ? (
                  <Agenda
                    key={agenda.agendaId}
                    agendaId={agenda.agendaId}
                    title={agenda.title}
                    type={agenda.type}
                    currentDuration={agenda.currentDuration}
                    remainingDuration={agenda.remainingDuration}
                    status={agenda.status}
                  />
                ) : (
                  <Draggable
                    key={agenda.agendaId}
                    draggableId={agenda.agendaId.toString()}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Agenda
                          agendaId={agenda.agendaId}
                          title={agenda.title}
                          type={agenda.type}
                          currentDuration={agenda.currentDuration}
                          remainingDuration={agenda.remainingDuration}
                          status={agenda.status}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </StyledAgendaList>
          )}
        </Droppable>
      </DragDropContext>

      <Space height={10} />

      <TimeLineButton onClick={onOpen} />

      <Space height={14} />

      <Flex justify="space-between" align="flex-start">
        <Flex direction="column" align="flex-start" gap={6}>
          <ButtonWrapper width={78}>
            <Button
              size={'sm'}
              fullWidth
              backgroundColor={'main'}
              onClick={() => {}}>
              회의 종료
            </Button>
          </ButtonWrapper>
          <ExitButtonChip isHost={false}>
            회의 종료는 방장만 할 수 있어요!
          </ExitButtonChip>
        </Flex>

        <ExitButton>회의실 나가기</ExitButton>

        <Space height={220} />
      </Flex>

      <ModalPortal>
        {open && (
          <Modal
            onAgendaClick={() =>
              openBottomSheet({ content: <AgendaSheet refetch={refetch} /> })
            }
            onBreakTimeClick={() =>
              openBottomSheet({ content: <BreakTimeSheet refetch={refetch} /> })
            }
            closeModal={onClose}
          />
        )}
      </ModalPortal>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  background-color: #f2f4f6;
  min-height: 100vh;
  width: 375px;
  box-sizing: border-box;
  margin: 0px -20px;
  padding: 0px 20px;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledAgendaList = styled.div`
  display: grid;
  row-gap: 1rem;
  width: 100%;
`;

const ExitButton = styled.button`
  color: ${theme.palette.dark_gray1};
  ${theme.typo.BS};
  padding: 11px 9px;
  border-radius: 8px;

  flex-shrink: 0;
`;

const ExitButtonChip = styled.div<{
  isHost: boolean;
}>`
  padding: 5px 12px;
  background-color: ${theme.palette.white};
  color: ${theme.palette.main_blue};
  ${theme.typo.BS};
  border-radius: 20px;
  display: ${({ isHost }) => (isHost ? 'none' : 'visible')};
`;

export default MeetingPage;
