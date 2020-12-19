import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Products, Navbar } from '../components'
import { commerce } from '../lib/commerce'

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {

  const [cart, setCart] = useState<any>({})

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const addToCart= async (productId: string, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

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
      <Navbar totalItems={cart.total_items}/>
      <Products products={products} addToCart={addToCart}/>
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