import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ModalPortal,
  SvgIcon
} from '@shared/common/ui';
import { media, theme } from '@shared/common/styles';
import { useOpen, useBottomSheet } from '@shared/common/hooks';
import { getCookie } from '@shared/common/utils';
import { AgendaResponse } from '@shared/meeting/apis/types';
import {
  useAddAgenda,
  useEndMeeting,
  useGetAgendaList,
  useReorderAgenda
} from '@shared/meeting/apis';

import {
  MeetingCard,
  TimeLineButton,
  Modal,
  Agenda,
  AgendaSheet
} from '@features/meeting/ui';

export interface AgendaResponseWithOrder extends AgendaResponse {
  order: number;
}

const MeetingPage = () => {
  const navigate = useNavigate();

  const meetingId = useParams().meetingId || '';

  const { open, onOpen, onClose } = useOpen();

  const { openBottomSheet } = useBottomSheet();

  const { data, refetch: refetchAgendaList } = useGetAgendaList({
    token: getCookie('token'),
    meetingId
  });

  const { mutate: endMeeting } = useEndMeeting({
    token: getCookie('token'),
    meetingId
  });

  const { sendAddAgendaMessage } = useAddAgenda(meetingId);

  const { sendReorderAgendaMessage } = useReorderAgenda(meetingId);

  const [agendaList, setAgendaList] = useState<AgendaResponseWithOrder[]>([]);

  const updateAgendaOrder = (agendaList: AgendaResponse[]) => {
    let agendaOrder = 1;
    setAgendaList(
      agendaList.map((agenda) => {
        const order = agenda.type === 'AGENDA' ? agendaOrder++ : -1;
        return { ...agenda, order };
      })
    );
  };

  useEffect(() => {
    updateAgendaOrder(data?.agendaResponse || []);
  }, [data, refetchAgendaList]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return null;
    }

    const reorderedAgendaList = Array.from(agendaList);
    const [removed] = reorderedAgendaList.splice(result.source.index, 1);
    reorderedAgendaList.splice(result.destination.index, 0, removed);

    sendReorderAgendaMessage({
      agendaIds: reorderedAgendaList.map((agenda) => agenda.agendaId)
    });

    updateAgendaOrder(reorderedAgendaList);
  };

  const firstPendingAgendaId = agendaList.find(
    (agenda) => agenda.status !== 'COMPLETED'
  )?.agendaId;

  const isDragDisabled = agendaList.some(
    (agenda) => agenda.status === 'INPROGRESS' || agenda.status === 'PAUSED'
  );

  return (
    <Wrapper direction="column" justify="flex-start">
      {/* TODO Header onClick 핸들러 연결, background-color */}
      <Header>
        <Header.Left>
          <SvgIcon id="hamburger_menu" onClick={() => {}} />
        </Header.Left>
        <Header.Center>회의실</Header.Center>
        <Header.Right>
          <SvgIcon id="share" onClick={() => {}} />
        </Header.Right>
      </Header>

      <Space height={10} />

      <MeetingCard />

      <Space height={20} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <StyledAgendaList
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {agendaList.map((agenda, index) => (
                <Fragment key={agenda.agendaId}>
                  {agenda.status === 'COMPLETED' && (
                    <>
                      <Agenda
                        agendaId={agenda.agendaId}
                        order={agenda.order}
                        title={agenda.title}
                        type={agenda.type}
                        currentDuration={agenda.currentDuration}
                        remainingDuration={agenda.remainingDuration}
                        status={agenda.status}
                        isFirstPendingAgenda={
                          firstPendingAgendaId === agenda.agendaId
                        }
                        refetchAgendaList={refetchAgendaList}
                      />
                      <Space height={10} />
                    </>
                  )}

                  {agenda.status !== 'COMPLETED' && (
                    <Draggable
                      index={index}
                      draggableId={agenda.agendaId.toString()}
                      isDragDisabled={isDragDisabled}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <Agenda
                            agendaId={agenda.agendaId}
                            order={agenda.order}
                            title={agenda.title}
                            type={agenda.type}
                            currentDuration={agenda.currentDuration}
                            remainingDuration={agenda.remainingDuration}
                            status={agenda.status}
                            isFirstPendingAgenda={
                              firstPendingAgendaId === agenda.agendaId
                            }
                            refetchAgendaList={refetchAgendaList}
                          />
                          <Space height={10} />
                        </div>
                      )}
                    </Draggable>
                  )}
                </Fragment>
              ))}
              {provided.placeholder}
            </StyledAgendaList>
          )}
        </Droppable>
      </DragDropContext>

      <TimeLineButton onClick={onOpen} />

      <Space height={14} />

      <Flex justify="space-between" align="flex-start">
        <Flex direction="column" align="flex-start" gap={6}>
          <ButtonWrapper width={78}>
            <Button
              size={'sm'}
              fullWidth
              backgroundColor={'main'}
              onClick={() => {
                endMeeting();
              }}>
              회의 종료
            </Button>
          </ButtonWrapper>
          <ExitButtonChip isHost={false}>
            회의 종료는 방장만 할 수 있어요!
          </ExitButtonChip>
        </Flex>

        <ExitButton onClick={() => navigate('/')}>회의실 나가기</ExitButton>

        <Space height={220} />
      </Flex>

      <ModalPortal>
        {open && (
          <Modal
            onAgendaClick={() =>
              openBottomSheet({
                content: (
                  <AgendaSheet
                    type="AGENDA"
                    sendAddAgendaMessage={sendAddAgendaMessage}
                  />
                )
              })
            }
            onBreakTimeClick={() =>
              openBottomSheet({
                content: (
                  <AgendaSheet
                    type="BREAK"
                    sendAddAgendaMessage={sendAddAgendaMessage}
                  />
                )
              })
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
  min-height: 100dvh;
  width: 375px;
  margin: 0px -20px;
  padding: 0px 20px;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledAgendaList = styled.div`
  /* display: grid; */
  /* row-gap: 1rem; */
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
