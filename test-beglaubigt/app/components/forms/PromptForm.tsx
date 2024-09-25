import { Button, Card, FormControl, FormErrorMessage, Text, Textarea, VStack } from '@chakra-ui/react';
import { PromptContext } from 'app/app/contexts/Prompt';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

type PromptFormProps = {
  textSelection: {
    selectionStart: number;
    selectionEnd: number;
    text: string;
  };
  onPromptReady: (prompt: string) => void;
};

type PromptFormContext = {
  prompt: string;
};

function PromptForm({ textSelection, onPromptReady }: PromptFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<PromptFormContext>();

  const onSubmit = handleSubmit(({ prompt }) => {
    onPromptReady(prompt);
  });

  const { error: serviceError, isLoading } = useContext(PromptContext);

  return (
    <Card bg="#d4a373" p="12px 24px" h="fit-content" as="form" onSubmit={onSubmit}>
      <VStack w="full" alignItems="flex-start">
        <Text>What do you want to change ?</Text>
        <Text fontSize="sm">
          <Text as="span" fontWeight="bold">
            Text selected:
          </Text>{' '}
          {textSelection.text.length <= 250 ? textSelection.text : `${textSelection.text.substring(0, 250)}...`}
        </Text>

        <FormControl isInvalid={!!errors.prompt}>
          <Textarea
            bg="white"
            placeholder="Suggestion: Fix grammar"
            rows={5}
            isDisabled={isLoading}
            {...register('prompt', {
              required: 'You must enter something',
              maxLength: {
                value: 500,
                message: 'Your prompt should not be more than 500 chars long.',
              },
            })}
          ></Textarea>
          <FormErrorMessage>{errors.prompt?.message}</FormErrorMessage>
        </FormControl>

        {serviceError && <Text color="yellow">Something wrong happened: {serviceError.toString()}</Text>}

        <Button type="submit" isDisabled={!isDirty || !isValid} colorScheme="orange" isLoading={isLoading}>
          Apply
        </Button>
      </VStack>
    </Card>
  );
}

export default PromptForm;
