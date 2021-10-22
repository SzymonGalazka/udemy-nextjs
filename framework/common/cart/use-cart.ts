import { useHook, useSWRHook } from '../utils/use-hook';
import { ApiHooks } from '@common/types/hooks';
import Cookies from 'js-cookie';
import { useApiProvider } from '@common';

const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart);
  const { checkoutCookie } = useApiProvider();

  const fetchWrapper: typeof hook.fetch = (context) => {
    context.input.checkoutId = Cookies.get(checkoutCookie);
    return hook.fetch(context);
  };

  return useSWRHook({ ...hook, fetch: fetchWrapper });
};

export default useCart;
