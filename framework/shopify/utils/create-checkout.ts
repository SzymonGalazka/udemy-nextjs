import { ApiFetch } from '@common/types/api';
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '@framework/const';
import { CheckoutCreatePayload } from '@framework/schema';
import Cookies from 'js-cookie';
import { checkoutCreateMutation } from './mutations';

const createCheckout = async (
  fetch: ApiFetch<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Maybe<Checkout | undefined>> => {
  const { data } = await fetch({
    query: checkoutCreateMutation,
  });

  const { checkout } = data.checkoutCreate;

  if (checkout?.id) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    };

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkout?.id, options);
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options);
  }
  return checkout;
};
export default createCheckout;
