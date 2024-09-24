'use client';

import {
  AspectRatio,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ControlledFileInput from './components/ControlledFileInput';
import { useCallback, useMemo, useRef, useState } from 'react';
import Prompt from './contexts/Prompt';

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nulla mi, pulvinar fringilla bibendum quis, elementum vitae ligula. Suspendisse et dapibus ante, sed bibendum massa. Fusce tincidunt nec enim ut viverra. Nam facilisis pulvinar porta. Pellentesque dignissim luctus justo, eu tristique nibh porta ornare. Mauris faucibus ligula ac posuere molestie. Pellentesque gravida, arcu ut condimentum pretium, nunc arcu commodo ante, vitae scelerisque orci sem efficitur metus. Sed nec neque eu ligula ullamcorper ornare. Donec vel euismod leo, vitae malesuada arcu. Mauris a sollicitudin odio. Fusce nulla lorem, commodo ac molestie quis, luctus vitae odio. Maecenas semper diam in mi fringilla, at congue leo molestie.

Nulla et sem nec velit sodales volutpat. Nam vitae lectus eget quam elementum cursus varius ornare lectus. Donec viverra lobortis nulla at placerat. Pellentesque quis posuere quam. Nam gravida at sapien at auctor. Proin sed augue quis eros venenatis blandit. Aenean blandit lobortis augue et placerat. Nam massa enim, lobortis ac ex non, porttitor vulputate magna. Nulla in laoreet sapien. Quisque sodales porta tellus vitae commodo. Fusce vel mollis velit. Cras vel ligula purus. Suspendisse hendrerit pellentesque lectus, sit amet molestie massa fringilla vitae.

Quisque dui nisi, posuere tincidunt interdum ut, dapibus ut orci. Aenean hendrerit metus at ante ornare, eget pharetra nisl porttitor. Suspendisse non ligula convallis, sollicitudin lacus eu, pharetra leo. Nunc mollis, urna a varius tincidunt, mi sem finibus purus, vitae lobortis orci lorem nec urna. Mauris rutrum semper ligula id facilisis. Praesent vel fringilla lectus. Morbi lobortis erat ipsum, sed scelerisque urna mattis laoreet. Duis nunc leo, elementum eu condimentum ac, pulvinar sit amet felis. Mauris vulputate ante ac sapien finibus condimentum sit amet vitae purus. Maecenas ac nibh id turpis egestas blandit. Nulla sagittis volutpat massa ac posuere. Aliquam in massa nec nibh pellentesque porta. Praesent augue tortor, imperdiet vel elit eu, gravida tincidunt nisl. Etiam efficitur libero dapibus elit efficitur, non rutrum tortor vehicula. Duis dictum consectetur nisl, sit amet semper risus bibendum ac. Donec scelerisque non eros sit amet malesuada.

Nulla fermentum sed elit nec posuere. Mauris sed augue imperdiet erat rutrum tempor. Curabitur ultrices ac purus nec bibendum. Etiam fringilla aliquam nisi a efficitur. In hac habitasse platea dictumst. In a fermentum odio. Proin aliquam mi purus. Etiam vitae aliquam metus. Nunc dictum mi laoreet mi fringilla dignissim.

Aliquam erat volutpat. Integer eget nisi tempus, volutpat nibh quis, tempor sem. Nulla at ultricies nibh. Integer eros ante, tincidunt vel quam eu, viverra venenatis quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer sit amet felis ut felis tempus dapibus nec ut purus. Cras pretium convallis orci. Integer vitae enim nec ex rutrum semper. Praesent scelerisque pretium lacus, vitae condimentum turpis lobortis sodales. Aliquam efficitur sit amet dolor quis pellentesque. Ut eleifend nec leo id ultrices.
`;

type UploadFormContext = {
  file: File;
};

export default function Home() {
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

  // TODO Create UploadDocumentForm component

  // TODO Create TextView component
  const [textSelection, setTextSelection] = useState<{
    selectionStart: number;
    selectionEnd: number;
    text: string;
  }>({
    selectionStart: 0,
    selectionEnd: 0,
    text: '',
  });

  const textViewRef = useRef<HTMLTextAreaElement>(null);
  const isTextSelected = useMemo<boolean>(() => textSelection.text !== '', [textSelection]);

  const onTextSelected = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSelection({
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd,
      text: event.target.value.substring(event.target.selectionStart, event.target.selectionEnd),
    });
  }, []);

  const onSuggestionFetched = useCallback(
    (suggestion: string) => {
      console.log(textSelection.text);
      console.log(suggestion);
    },
    [textSelection],
  );

  return (
    <VStack w="full" h="100vh" spacing="0">
      <Stack w="full" alignItems="center" px="12px" py="24px" bg="#d4a373">
        <Text fontWeight="bold" color="white">
          PDF Editor MVP
        </Text>
      </Stack>
      <VStack as="main" alignItems="center" w="full" flexGrow={1} px="48px" py="24px">
        {/* Upload form */}
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

        {/* Text area */}
        <HStack justifyContent="center" w="full" spacing="24px">
          <AspectRatio w="60%" minW="60%" ratio={1.4142 / 1} flexGrow={2}>
            <Textarea
              ref={textViewRef}
              resize="none"
              overflowY="auto"
              defaultValue={loremIpsum}
              onSelect={onTextSelected}
            ></Textarea>
          </AspectRatio>

          {/* Prompt input */}
          {isTextSelected && (
            <Prompt textViewRef={textViewRef} textSelection={textSelection} onSuggestionFetched={onSuggestionFetched} />
          )}
        </HStack>
      </VStack>
      <Stack w="full" alignItems="center" px="12px" py="12px" bg="#d4a373">
        <Text color="white">Copyright © Thomas 2024</Text>
      </Stack>
    </VStack>
  );
}
