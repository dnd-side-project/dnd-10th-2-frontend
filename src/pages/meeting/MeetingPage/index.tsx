import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import {
  ButtonWrapper,
  Flex,
  Space,
  Text,
  Button,
  Header,
  Input,
  ModalPortal
  //   TimePicker
} from '@shared/common/ui';
import { media, theme } from '@shared/common/styles';
import { useBottomSheet } from '@shared/common/hooks';

import {
  AgendaCard,
  MeetingCard,
  TimeLineButton,
  Modal
} from '@features/meeting/ui';

const MeetingPage = () => {
  const { openGlobalSheet } = useBottomSheet();
  const [modalOn, setModalOn] = useState(false);
  const {
    register,
    watch,
    // setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      agenda: '',
      agendaTime: {
        hour: 0,
        minute: 0
      },
      breakTimeTime: {
        hour: 0,
        minute: 0
      }
    },
    mode: 'onChange'
  });

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const agendaSheet = {
    isOpen: true,
    content: (
      <Flex direction="column" align="flex-start">
        <Text typo="T5" color="dark_gray2">
          첫 번째 안건을 알려주세요
        </Text>

        <Space height={16} />

        <Input
          {...register('agenda', { required: true })}
          placeholder="안건 입력"
          value={watch('agenda')}
          type="default"
          height={60}
          isError={errors.agenda ? true : false}
          errorText={errors.agenda?.message as string}
        />

        <Text typo="T5" color="dark_gray2">
          타이머를 맞춰주세요
        </Text>

        <Space height={16} />
        {/* <TimePicker
          value={watch('agendaTime')}
          setValue={(value: TimePickerValueGroups) =>
            setValue('agendaTime', value)
          }
        /> */}

        <Space height={16} />

        <Button
          size={'lg'}
          backgroundColor={'main'}
          onClick={() => console.log(watch('agenda'), watch('agendaTime'))}>
          완료하기
        </Button>
      </Flex>
    )
  };

  const breakTimeSheet = {
    isOpen: true,
    content: (
      <Flex direction="column" align="flex-start">
        <Text typo="T5" color="dark_gray2">
          타이머를 맞춰주세요
        </Text>

        <Space height={16} />

        {/* <TimePicker
          value={watch('breakTimeTime')}
          setValue={(value: TimePickerValueGroups) =>
            setValue('breakTimeTime', value)
          }
        /> */}

        <Space height={16} />

        <Button
          size={'lg'}
          backgroundColor={'main'}
          onClick={() => console.log(watch('breakTimeTime'))}>
          완료하기
        </Button>
      </Flex>
    )
  };

  const userListSheet = {
    isOpen: true,
    content: (
      <Flex justify="flex-start">
        <Text typo="T5" color="dark_gray2">
          참여자 목록
        </Text>

        <Space height={16} />

        {/* <List ={} /> */}
      </Flex>
    )
  };

  // TODO page 전체 background-color
  return (
    <Wrapper direction="column" justify="flex-start">
      {/* TODO Header onClick 핸들러 연결, background-color */}
      <Header iconLeftId="hamburger_menu" title="회의실" iconRightId2="share" />

      <Space height={10} />

      {/* TODO props data */}
      <MeetingCard
        date={'2024년 2월 11일'}
        isHost={true}
        title={'DND 2조 3차 회의'}
        onClickUserList={() => openGlobalSheet(userListSheet)}
        actualTotalDuration={'01:01:02'}
      />
      <Space height={20} />
      <AgendaCard
        type="agenda"
        time="00:10:00"
        title="아이스브레이킹"
        currentOrder={2}
        agendaOrder={1}
        isDone
      />
      <Space height={10} />
      <AgendaCard
        type="breakTime"
        time="00:10:00"
        title="아이스브레이킹"
        currentOrder={2}
        agendaOrder={2}
        isDone
      />
      <Space height={10} />
      <AgendaCard
        type="agenda"
        time="00:10:00"
        title="아이스브레이킹"
        currentOrder={2}
        agendaOrder={2}
      />
      <Space height={10} />
      <AgendaCard
        type="breakTime"
        time="00:10:00"
        title="아이스브레이킹"
        currentOrder={2}
        agendaOrder={3}
      />
      <Space height={10} />
      <TimeLineButton onClick={handleModal} />
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
        {modalOn && (
          <Modal
            onAgendaClick={() => openGlobalSheet(agendaSheet)}
            onBreakTimeClick={() => openGlobalSheet(breakTimeSheet)}
            closeModal={handleModal}
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
