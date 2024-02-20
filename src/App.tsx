import { Flex } from '@/components/Wrapper';
import { MeetingCard } from '@/components/meetingRoom/MeetingCard';

function App() {
  return (
    <Flex direction="column">
      <MeetingCard
        date="2024년 2월 11일"
        isHost={true}
        title="DND 2조 3차 회의"
        description="오늘은 꼭 메인 화면 픽스를 목표로 진행합시다!"
        onClickUserList={() => {}}
        actualTotalDuration="00:01:12"
      />
    </Flex>
  );
}

export default App;
