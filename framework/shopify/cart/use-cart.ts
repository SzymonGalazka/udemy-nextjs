import { useApiProvider } from '@common';
import useCart, { UseCart } from '@common/cart/use-cart';
import { Cart } from '@common/types/cart';
import { SWRHook } from '@common/types/hooks';
import { Checkout } from '@framework/schema';
import {
  checkoutToCart,
  createCheckout,
  getCheckoutQuery,
} from '@framework/utils';
import { useMemo } from 'react';
import Cookies from 'js-cookie';

export type UseCartHookDescriptor = {
  fetchInput: {
    checkoutId: string;
  };
  fetchOutput: {
    node: Checkout;
  };
  data: Cart;
};

export default useCart as UseCart<typeof handler>;

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetch({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout;

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      });
      checkout = data.node;
    } else {
      checkout = await createCheckout(fetch as any);
    }

    const cart = checkoutToCart(checkout);
    return cart;
  },
  useHook:
    ({ useData }) =>
    () => {
      const { checkoutCookie } = useApiProvider();
      const result = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      });
      
      if (result.data?.completedAt) {
        Cookies.remove(checkoutCookie);
      }

      return useMemo(() => {
        return {
          ...result,
          isEmpty: (result.data?.lineItems.length ?? 0) <= 0,
        };
      }, [result]);
    },
};
