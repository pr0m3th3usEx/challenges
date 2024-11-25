import { useApiQuery } from '@/hooks/useApiQuery';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { GetOrganoidRequest, GetOrganoidResponse } from '@okomera/api';

function useGetOrganoidQuery({ organoidId }: GetOrganoidRequest) {
  return useApiQuery<GetOrganoidResponse, unknown>(organoidId ? ['organoid', organoidId] : null, {
    path: URLBuild(`${config.apiGatewayUrl}/organoids/${organoidId}`),
  });
}

export default useGetOrganoidQuery;
