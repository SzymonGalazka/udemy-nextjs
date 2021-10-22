import { ApiHooks } from './hooks';

export type ApiFetchOptions = {
  query: string;
  variables?: Variables;
};

export type Variables = { [key: string]: string | any | undefined };

export type ApiFetchResults<T> = {
  data: T;
};

export interface ApiConfig {
  fetch<T>(options: ApiFetchOptions): Promise<ApiFetchResults<T>>;
  checkoutCookie: string;
}

export type ApiFetch<T = any> = (
  options: ApiFetchOptions
) => Promise<ApiFetchResults<T>>;

export interface ApiProviderContext {
  hooks: ApiHooks;
  fetch: ApiFetch;
  checkoutCookie: string;
}
