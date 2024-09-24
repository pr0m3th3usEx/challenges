'use client';

import { Button, FormControl, FormLabel, Input, Stack, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  // TODO Add form validation
  // Create UploadDocumentForm component

  return (
    <VStack w="full" h="100vh" spacing="0">
      <Stack w="full" alignItems="center" px="12px" py="24px" bg="#d4a373">
        <Text fontWeight="bold" color="white">
          PDF Editor MVP
        </Text>
      </Stack>
      <VStack as="main" alignItems="center" w="full" flexGrow={1} px="48px" py="24px">
        <VStack as="form" w="fit-content">
          <FormControl>
            <FormLabel>Select a PDF file: </FormLabel>
            <Input type="file" accept="image/*,.pdf" />
          </FormControl>
          <Button>Submit</Button>
        </VStack>
      </VStack>
      <Stack w="full" alignItems="center" px="12px" py="12px" bg="#d4a373">
        <Text color="white">Copyright © Thomas 2024</Text>
      </Stack>
    </VStack>
  );
}
