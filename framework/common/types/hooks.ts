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
    useCart: any;
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

export type SWRHook<H extends HookDescriptor = any> = {
  fetchOptions: HookFetchOptions;
  fetch: HookFetchFn<H['fetchInput'], H['fetchOutput'], H['data']>;
  useHook(context: {
    useData: UseData<SWRResponse<H['data'], any>>;
  }): () => SWRResponse<H['data'], any>;
};

export type Hook = MutationHook | SWRHook;
