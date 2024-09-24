import { createContext, RefObject, useCallback, useState } from 'react';
import PromptForm from '../components/forms/PromptForm';
import aiService from '../services/aiService';

const defaultValue = {
  isLoading: false,
  error: undefined,
};

export const PromptContext = createContext<{
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
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

        // Call API
        try {
          // Mock
          // setTimeout(() => {
          //   textViewRef.current!.disabled = false;
          //   setContext({
          //     isLoading: false,
          //     error: undefined,
          //   });

          //   onSuggestionFetched('blabla');
          // }, 2000);

          const data = await aiService.getSuggestion(prompt, textSelection.text);
          // Reset state
          textViewRef.current.disabled = false;
          setContext({
            isLoading: false,
            error: undefined,
          });
          onSuggestionFetched(data.suggestion);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          textViewRef.current.disabled = false;
          setContext({
            isLoading: false,
            error: error,
          });
        }
      };

      fetchSuggestion();
    },
    [textSelection, textViewRef, onSuggestionFetched],
  );

  return (
    <PromptContext.Provider value={context}>
      <PromptForm textSelection={textSelection} onPromptReady={onPromptReady} />
    </PromptContext.Provider>
  );
}

export default Prompt;
