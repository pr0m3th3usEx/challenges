import { createContext, RefObject, useCallback, useState } from 'react';
import PromptForm from '../components/forms/PromptForm';

const defaultValue = {
  isLoading: false,
  error: undefined,
};

export const PromptContext = createContext<{
  isLoading: boolean;
  error: unknown | undefined;
}>(defaultValue);

function Prompt({
  textSelection,
  textViewRef,
  onSuggestionFetched,
}: {
  textSelection: {
    selectionStart: number;
    selectionEnd: number;
    text: string;
  };
  textViewRef: RefObject<HTMLTextAreaElement>;
  onSuggestionFetched: (suggesstion: string) => void;
}) {
  const [context, setContext] = useState(defaultValue);

  const onPromptReady = useCallback(
    (prompt: string) => {
      const fetchSuggestion = async () => {
        if (!textViewRef.current) return;

        // Prepare loading state before API call
        textViewRef.current.disabled = true;
        setContext((old) => ({
          ...old,
          isLoading: true,
        }));

        // Call API /ai/
        try {
          // Mock
          setTimeout(() => {
            textViewRef.current!.disabled = false;
            setContext({
              isLoading: false,
              error: undefined,
            });
          }, 2000);

          // const response = await aiService.call(prompt, textSelection.text);
          // // Reset state
          // textViewRef.current.disabled = false;
          // setContext({
          //   isLoading: false,
          //   error: undefined,
          // });
          // onSuggestionFetched(response.data);
        } catch (_error) {
          // textViewRef.current.disabled = false;
          // setContext({
          //   isLoading: false,
          //   error,
          // });
        }
      };

      fetchSuggestion();
    },
    [textSelection, textViewRef, context, onSuggestionFetched],
  );

  return (
    <PromptContext.Provider value={context}>
      <PromptForm textSelection={textSelection} onPromptReady={onPromptReady} />
    </PromptContext.Provider>
  );
}

export default Prompt;
