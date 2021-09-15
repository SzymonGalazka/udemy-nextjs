import type { InferGetStaticPropsType } from 'next';
import getAllProducts from '../framework/shopify/get-all-products';

export const getStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: { products },
    revalidate: 4 * 60 * 60,
  };
};

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{JSON.stringify(products)}</div>;
}
