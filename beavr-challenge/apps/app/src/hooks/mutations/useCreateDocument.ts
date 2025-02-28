import useApiMutation from '../useApiMutation';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { CreateDocumentRequest, CreateDocumentResponse } from '@beavr/api';

function useCreateDocument() {
  const { trigger, ...rest } = useApiMutation<CreateDocumentResponse, CreateDocumentRequest>(
    (key) => Array.isArray(key) && key[0] === 'documents',
    (body) => ({
      method: 'POST',
      path: URLBuild(`${config.apiGatewayUrl}/documents`),
      body,
    }),
  );

  return {
    createDocument: trigger,
    ...rest,
  };
}

export default useCreateDocument;
