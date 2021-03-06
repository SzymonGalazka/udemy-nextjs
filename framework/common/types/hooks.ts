import { SWRResponse } from 'swr';
import { ApiFetch, ApiFetchOptions } from './api';

export type MutationHookContext<Input, Output> = {
  fetch: (input: Input) => Promise<Output>;
};

export type SWRHookContext<Input, Output> = {
  useData: (input: Input) => Promise<Output>;
};

export type HookFetchContext<Input, Output> = {
  input: Input;
  fetch: ApiFetch<Output>;
  options: ApiFetchOptions;
};

export interface ApiHooks {
  cart: {
    useAddItem: MutationHook;
    useCart: SWRHook;
    useRemoveItem: MutationHook;
    useUpdateItem: MutationHook;
  };
}

export type HookFetchOptions = {
  query: string;
};

export type HookDescriptor = {
  fetchInput: any;
  fetchOutput: any;
  data: any;
};

export type HookFetchFn<Input, Output, Data> = (
  context: HookFetchContext<Input, Output>
) => Promise<Data>;

export type MutationHook<H extends HookDescriptor = any> = {
  fetchOptions: HookFetchOptions;
  fetch: HookFetchFn<H['fetchInput'], H['fetchOutput'], H['data']>;
  useHook(
    context: MutationHookContext<H['fetchInput'], H['data']>
  ): () => (input: H['fetchInput']) => Promise<H['data']>;
};

export type UseDataContext = {
  swrOptions: any;
};

export type UseData<Data> = (context: UseDataContext) => Data;

export type SWRHookResponse<Data> = SWRResponse<Data, any> & {
  isEmpty: boolean;
};

export type SWRHook<H extends HookDescriptor = any> = {
  fetchOptions: HookFetchOptions;
  fetch: HookFetchFn<H['fetchInput'], H['fetchOutput'], H['data']>;
  useHook(context: {
    useData: UseData<SWRHookResponse<H['data']>>;
  }): () => SWRHookResponse<H['data']>;
};

export type Hook = MutationHook | SWRHook;
