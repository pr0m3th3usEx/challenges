import { useApiQuery } from '@/hooks/useApiQuery';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { GetDocumentsResponse } from '@beavr/api';

function useGetDocumentsQuery() {
  return useApiQuery<GetDocumentsResponse, unknown>(['documents'], {
    path: URLBuild(`${config.apiGatewayUrl}/documents`),
  });
}

export default useGetDocumentsQuery;
