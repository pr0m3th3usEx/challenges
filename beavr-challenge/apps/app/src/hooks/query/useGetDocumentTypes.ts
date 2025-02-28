import { useApiQuery } from '@/hooks/useApiQuery';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { GetDocumentTypesResponse } from '@beavr/api';

function useGetDocumentsTypesQuery() {
  return useApiQuery<GetDocumentTypesResponse, unknown>(['documentsTypes'], {
    path: URLBuild(`${config.apiGatewayUrl}/documents/types`),
  });
}

export default useGetDocumentsTypesQuery;
