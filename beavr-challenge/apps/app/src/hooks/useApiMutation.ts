/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fetcher, SWRArgs } from './useApiQuery';
import { Key, useSWRConfig } from 'swr';
import { useState } from 'react';

const useApiMutation = <Result = any, Args = any>(
  key: (key?: Key) => boolean,
  query: SWRArgs | ((data: Args) => SWRArgs),
) => {
  const mutationFn = async (arg: Args): Promise<Result> => {
    const options: SWRArgs = typeof query === 'function' ? query(arg) : query;

    return (
      await Fetcher.request<Result>(
        options.method,
        options.path,
        options.method !== 'GET' ? JSON.stringify(options.body ?? {}) : '',
      )
    ).body;
  };

  const { mutate } = useSWRConfig();
  const [isMutating, setIsMutating] = useState<boolean>();

  const trigger = async (data: Args) => {
    setIsMutating(true);

    try {
      const res = await mutationFn(data);
      await mutate<Result>(key, res, { revalidate: true, throwOnError: true, populateCache: false });
      setIsMutating(false);

      return res;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    trigger,
    isMutating,
  };
};

export default useApiMutation;
