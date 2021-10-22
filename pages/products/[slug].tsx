import React from 'react';
import { Layout } from '@components/common';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { getProduct, getAllProductsPaths } from '@framework/product';
import { getConfig } from '@framework/api/config';
import { ProductView } from '@components/product';

//fetch all products slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig();
  const { products } = await getAllProductsPaths(config);
  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  };
};

// provide product specific data to the page
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig();
  const { product } = await getProduct({
    config,
    variables: { slug: params?.slug },
  });

  return {
    props: {
      product,
    },
  };
};

const ProductSlug = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(JSON.stringify(product, null, 2));
  return <>{product && <ProductView product={product} />}</>;
};

ProductSlug.Layout = Layout;

export default ProductSlug;
