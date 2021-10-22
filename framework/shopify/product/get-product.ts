import { ApiConfig, Variables } from '@common/types/api';
import { getProductQuery, normalizeProduct } from '@framework/utils';
import { Product } from '@common/types/product';
import { Product as ShopifyProduct } from '@framework/schema';

type ReturnType = {
  product: Product | null;
};

type FetchType = {
  productByHandle: ShopifyProduct;
};

const getProduct = async (options: {
  config: ApiConfig;
  variables?: Variables;
}): Promise<ReturnType> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    variables,
  });
  const { productByHandle } = data;
  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  };
};

export default getProduct;
