import { Cart, LineItem } from '@common/types/cart';
import { Product } from '@common/types/product';
import {
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
  SelectedOption,
  Checkout,
  CheckoutLineItemEdge,
} from '../schema';

const normalizeProductImages = ({ edges }: { edges: ImageEdge[] }) =>
  edges.map(({ node: { originalSrc, ...rest } }) => ({
    url: `/images/${originalSrc}`,
    ...rest,
  }));

const normalizeProductPrice = ({ currencyCode, amount }: MoneyV2) => ({
  value: +amount,
  currencyCode,
});

const normalizeProductOption = ({
  id,
  values,
  name: displayName,
}: ProductOption) => {
  const normalized = {
    id,
    displayName,
    values: values.map((val) => {
      const output = {
        label: val,
        ...(displayName.match(/colou?r/gi) && { hexColor: val }),
      };
      return output;
    }),
  };
  return normalized;
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;
    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOption({
          id,
          name,
          values: [value],
        });
        return option;
      }),
    };
  });
};

export const normalizeProduct = (productNode: ShopifyProduct): Product => {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode;
  const product = {
    id,
    name,
    handle,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ''),
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options
      ? options
          .filter((o) => o.name !== 'Title')
          .map((o) => normalizeProductOption(o))
      : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest,
  };
  return product;
};

const normalizeLineItem = ({
  node: { id, title, variant, ...rest },
}: CheckoutLineItemEdge): LineItem => {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    path: variant?.product?.handle ?? '',
    discounts: [],
    options: variant?.selectedOptions.map(({ name, value }: SelectedOption) => {
      const option = normalizeProductOption({
        id,
        name,
        values: [value],
      });

      return option;
    }),
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title,
      image: {
        url:
          process.env.NEXT_PUBLIC_FRAMEWORK === 'shopify_local'
            ? `/images/${variant?.image?.originalSrc}`
            : variant?.image?.originalSrc ?? '/product-image-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      // actual price
      price: variant?.priceV2.amount,
      // base price
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    ...rest,
  };
};

export const normalizeCart = (checkout: Checkout): Cart => {
  return {
    id: checkout.id,
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
    totalPrice: checkout.totalPriceV2.amount,
    lineItems: checkout.lineItems.edges.map(normalizeLineItem),
    discounts: [],
  };
};
