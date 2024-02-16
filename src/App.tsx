import { Flex } from '@/components/Wrapper';
import { Timer } from '@/components/timer/Timer';

function App() {
  return (
    <Flex direction="column">
      <Timer serverTime={new Date()} time={30} />
    </Flex>
  );
}

export default App;
