import { useApiProvider } from '@common';
import { ApiFetch } from '@common/types/api';
import { ApiHooks, Hook } from '@common/types/hooks';
import { MutationHook } from '@common/types/hooks';
import useSWR from 'swr';

export const useHook = <H>(fn: (apiHooks: ApiHooks) => H) => {
  const { hooks } = useApiProvider();
  return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
  const { fetch } = useApiProvider();
  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetch({
        input,
        fetch,
        options: hook.fetchOptions,
      });
    },
  });
};

const useData = (hook: any, fetch: ApiFetch, context: any) => {
  const hookFetch = async (query: string) => {
    try {
      return await hook.fetch({ fetch, options: { query }, input: {} });
    } catch (error) {
      throw error;
    }
  };

  const res = useSWR(hook.fetchOptions.query, hookFetch, context.swrOptions);

  return res;
};

export const useSWRHook = (hook: any) => {
  const { fetch } = useApiProvider();

  return hook.useHook({
    useData(context: any) {
      const data = useData(hook, fetch, context);
      return data;
    },
  });
};
