import { VStack } from '@chakra-ui/react';
import NavigationBar from '../widgets/navigation-bar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack w="100vw" h="100vh" overflow="auto" gap={0} bg="#202129">
      <NavigationBar />
      {children}
    </VStack>
  );
};

export default AppLayout;
