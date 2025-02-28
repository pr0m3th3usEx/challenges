import { Box, HStack, Link } from '@chakra-ui/react';
import { NavLink, BrowserRouter, Route, Routes } from 'react-router';
import Requirements from './pages/Requirements';
import Documents from './pages/Documents';

function App() {
  return (
    <BrowserRouter>
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="start"
        alignItems="stretch"
        gap="12px"
      >
        <HStack w="100%" flexGrow={0} flexShrink={1} bg="blue.500" py="18px" px="14px" gap="24px">
          <NavLink to="/">
            <Link>Requirements</Link>
          </NavLink>
          <NavLink to="/documents">
            <Link>Documents</Link>
          </NavLink>
        </HStack>
        <Box flexGrow={1} height="auto">
          <Routes>
            <Route index element={<Requirements />} />
            <Route path="documents" element={<Documents />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
