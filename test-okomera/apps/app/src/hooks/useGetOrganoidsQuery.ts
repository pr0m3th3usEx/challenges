import { useApiQuery } from '@/hooks/useApiQuery';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { GetOrganoidsRequest, GetOrganoidsResponse } from '@okomera/api';

function useGetOrganoidsQuery({ dataset }: GetOrganoidsRequest) {
  return useApiQuery<GetOrganoidsResponse, unknown>(['organoids', dataset], {
    path: URLBuild(`${config.apiGatewayUrl}/organoids`, { dataset }),
  });
}

export default useGetOrganoidsQuery;
