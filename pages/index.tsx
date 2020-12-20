import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Products } from '../components'
import { commerce } from '../lib/commerce'
import { useStoreContext } from '../utils/context'

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { fetchCart, cart } = useStoreContext()

  useEffect(() => {
    fetchCart()
    console.log("useEffect ran")
  }, [])

  console.log("Home: ", cart)

  return (
    <div>
      <Head>
        <title>Welcome To The Shop | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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