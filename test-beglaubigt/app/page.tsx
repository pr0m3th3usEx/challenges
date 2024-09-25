'use client';

import {
  AspectRatio,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ControlledFileInput from './components/ControlledFileInput';
import { useCallback, useMemo, useRef, useState } from 'react';
import Prompt from './contexts/Prompt';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.js';

type UploadFormContext = {
  file: File;
};

export default function Home() {
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [pdfText, setPdfText] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<UploadFormContext>({
    mode: 'onChange',
  });

  const onUploadFormSubmit = handleSubmit((data) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';

    const extractTextFromPDF = async (pdf: pdfjsLib.PDFDocumentProxy) => {
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => ('str' in item ? item.str : ''));
        text += strings.join('\n') + '\n';
      }
      return text;
    };

    const reader = new FileReader();

    setIsLoadingPdf(true);

    reader.onload = async (e) => {
      if (e.target) {
        const typedArray = new Uint8Array(e.target.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const text = await extractTextFromPDF(pdf);

        setPdfText(text);
        setIsLoadingPdf(false);
      }
    };
    reader.readAsArrayBuffer(data.file);
  });

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
      if (!textViewRef.current) return;

      const before = textViewRef.current.value.substring(0, textSelection.selectionStart);
      const after = textViewRef.current.value.substring(textSelection.selectionEnd);

      setPdfText(`${before}${suggestion}${after}`);

      textViewRef.current.focus();

      setTextSelection({
        selectionStart: 0,
        selectionEnd: 0,
        text: '',
      });
    },
    [textSelection, textViewRef],
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
        {pdfText.length === 0 && (
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
            <Button type="submit" colorScheme="yellow" isDisabled={!isDirty || !isValid} isLoading={isLoadingPdf}>
              Submit
            </Button>
          </VStack>
        )}

        {/* Text area */}
        {pdfText.length > 0 && (
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            justifyContent="center"
            w="full"
            h="full"
            spacing="24px"
          >
            <AspectRatio w={{ base: 'full', lg: '60%' }} minW={{ base: 'full', lg: '60%' }} h="full">
              <Textarea
                ref={textViewRef}
                resize="none"
                overflowY="auto"
                value={pdfText}
                onChange={(e) => setPdfText(e.target.value)}
                onSelect={onTextSelected}
              ></Textarea>
            </AspectRatio>

            {/* Prompt input */}
            {isTextSelected && (
              <Prompt
                textViewRef={textViewRef}
                textSelection={textSelection}
                onSuggestionFetched={onSuggestionFetched}
              />
            )}
          </Stack>
        )}
      </VStack>
      <Stack w="full" alignItems="center" px="12px" py="12px" bg="#d4a373">
        <Text color="white">Copyright © Thomas 2024</Text>
      </Stack>
    </VStack>
  );
}
