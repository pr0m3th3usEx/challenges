import { useApiQuery } from '@/hooks/useApiQuery';
import { URLBuild } from '@/utils';
import config from '@/utils/config';
import { GetRequirementsResponse } from '@beavr/api';

function useGetRequirementsQuery() {
  return useApiQuery<GetRequirementsResponse, unknown>(['requirements'], {
    path: URLBuild(`${config.apiGatewayUrl}/requirements`),
  });
}

export default useGetRequirementsQuery;
