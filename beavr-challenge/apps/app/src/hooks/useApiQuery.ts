/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR, { Key } from 'swr';

export type SWRArgs<BodyType = any> = {
  method: string;
  path: string;
  body?: BodyType | null;
  headers?: HeadersInit | null;
};

interface FetchResp<Type> {
  status: number;
  body: Type;
}

export const Fetcher = {
  request: async <T>(
    method: string,
    path: string,
    body: BodyInit | null = null,
    headers: HeadersInit = { 'Content-Type': 'application/json' },
  ): Promise<FetchResp<T>> => {
    return await fetch(path, { method, headers, body }).then(async (res) => {
      if (res.status < 200 || res.status >= 300) {
        try {
          const responseBody = await res.text();

          throw {
            status: res.status,

            data: JSON.parse(responseBody),
          };
        } catch (err: any) {
          throw {
            status: res.status,

            data: 'data' in err ? err.data : {},
          };
        }
      }

      try {
        const responseBody = await res.text();

        return {
          status: res.status,
          body: JSON.parse(responseBody) as T,
        };
      } catch (_) {
        return {
          status: res.status,
          body: {} as T,
        };
      }
    });
  },

  get: async <T>(path: string, headers: any = {}): Promise<FetchResp<T>> =>
    Fetcher.request<T>('GET', path, null, headers),
};

export const useApiQuery = <Result = any, Error = any>(key: Key, options: Pick<SWRArgs<never>, 'path' | 'headers'>) => {
  const queryFn = async (): Promise<Result> => {
    return (await Fetcher.get<Result>(options.path, options.headers)).body;
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR<Result, Error>(key, queryFn);

  return {
    data,
    revalidate: () => mutate(undefined, { revalidate: true }),
    error,
    isLoading,
    isValidating,
  };
};
