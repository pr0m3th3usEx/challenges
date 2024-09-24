'use client';

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ControlledFileInput from './components/ControlledFileInput';

type UploadFormContext = {
  file: File;
};

export default function Home() {
  // TODO Add form validation
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<UploadFormContext>({
    mode: 'onChange',
  });

  const onUploadFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  // Create UploadDocumentForm component

  return (
    <VStack w="full" h="100vh" spacing="0">
      <Stack w="full" alignItems="center" px="12px" py="24px" bg="#d4a373">
        <Text fontWeight="bold" color="white">
          PDF Editor MVP
        </Text>
      </Stack>
      <VStack as="main" alignItems="center" w="full" flexGrow={1} px="48px" py="24px">
        <VStack as="form" w="fit-content" onSubmit={onUploadFormSubmit}>
          <FormControl isRequired isInvalid={!!errors.file}>
            <FormLabel>Select a PDF file: </FormLabel>
            <ControlledFileInput
              control={control}
              name="file"
              accept=".pdf"
              isRequired
              rules={{
                validate: (v) => (!!v && v.type === 'application/pdf' ? true : 'File not supported'),
              }}
            />
            <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="yellow" isDisabled={!isDirty || !isValid} isLoading={false}>
            Submit
          </Button>
        </VStack>
      </VStack>
      <Stack w="full" alignItems="center" px="12px" py="12px" bg="#d4a373">
        <Text color="white">Copyright © Thomas 2024</Text>
      </Stack>
    </VStack>
  );
}
