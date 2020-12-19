import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Products, Navbar } from '../components'
import { commerce } from '../lib/commerce'
import { useStoreContext } from '../utils/context'

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { fetchCart, cart, addToCart } = useStoreContext()

  useEffect(() => {
    fetchCart()
  }, [])

  console.log(cart)

  return (
    <div>
      <Head>
        <title>Welcome To The Shop | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Products products={products}/>
    </div>
  )
}


export const getStaticProps : GetStaticProps = async () => {
  try {
    const { data } = await commerce.products.list()
    return {
      props: {
        products: data,
        
      }
    }
  } catch (error) {
    console.error("Cannot fetch products: ", error)
    return {
      props: {}
    }
  }
}