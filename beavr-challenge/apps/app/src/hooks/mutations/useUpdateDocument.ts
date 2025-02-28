import useApiMutation from '../useApiMutation';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { UpdateDocumentRequest, UpdateDocumentResponse } from '@beavr/api';

function useUpdateDocument() {
  const { trigger, ...rest } = useApiMutation<UpdateDocumentResponse, UpdateDocumentRequest>(
    (key) => Array.isArray(key) && (key[0] === 'documents' || key[0] === 'requirements'),
    ({ id, ...body }) => ({
      method: 'PUT',
      path: URLBuild(`${config.apiGatewayUrl}/documents/${id}`),
      body,
    }),
  );

  return {
    updateDocument: trigger,
    ...rest,
  };
}

export default useUpdateDocument;
