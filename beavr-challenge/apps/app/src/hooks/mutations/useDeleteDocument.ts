import useApiMutation from '../useApiMutation';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { DeleteDocumentRequest, DeleteDocumentResponse } from '@beavr/api';

function useDeleteDocument() {
  const { trigger, ...rest } = useApiMutation<DeleteDocumentResponse, DeleteDocumentRequest>(
    (key) => Array.isArray(key) && (key[0] === 'documents' || key[0] === 'requirements'),
    ({ id }) => ({
      method: 'DELETE',
      path: URLBuild(`${config.apiGatewayUrl}/documents/${id}`),
    }),
  );

  return {
    deleteDocument: trigger,
    ...rest,
  };
}

export default useDeleteDocument;
