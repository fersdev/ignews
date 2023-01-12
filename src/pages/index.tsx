import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../components/subscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// 3 forms to generate pages:
// Client-side
// Server-side
// Static Site Generation


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>Home Ig News!</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
      <span>Hey, welcome</span>
      <h1>News about the <span>React</span> world.</h1>
      <p>
        Get access to all the publications <br />
        <span>for {product.amount} month</span>
      </p>
      <SubscribeButton priceId={product.priceId}/>
      </section>
      <Image src="/images/avatar.svg" height="600" width="600" alt="Girl Coding"/>
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1LkHvxBqADLxYOtZXmRcJzWt', {
    expand: ['product']
  })

  // if wanna show product details, use expand.
  // const price = await stripe.prices.retrieve('price_1LkHvxBqADLxYOtZXmRcJzWt', {
  //   expand: ['product']
  // })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return { 
    props: {
        product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}