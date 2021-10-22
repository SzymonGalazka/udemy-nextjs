import type { InferGetStaticPropsType } from 'next';
import Layout from '../components/common/Layout/Layout';
import { Grid, Hero, Marquee } from '../components/ui';
import { getAllProducts } from '@framework/product';
import { getConfig } from '@framework/api/config';
import { ProductCard } from '@components/product';

export const getStaticProps = async () => {
  const config = getConfig();
  const products = await getAllProducts(config);
  return {
    props: { products },
    revalidate: 4 * 60 * 60,
  };
};

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid layout='A'>
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <Hero headline='Hero title' description='This is a description' />
      <Marquee>
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} variant='slim' />
        ))}
      </Marquee>
      <Grid layout='B'>
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <Marquee variant='secondary'>
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} variant='slim' />
        ))}
      </Marquee>
    </>
  );
}

Home.Layout = Layout;
