import React, { createContext, useState, useContext } from 'react';
import { commerce } from '../lib/commerce';

type Value =  {
  cart: any,
  addToCart(a: string, b: number): void,
  fetchCart(): void,
  handleUpdateCartQty(a: string, b: number): void,
  handleRemoveFromCart(a: string): void,
  handleEmptyCart(): void
}

const StoreContext = createContext<Value>(null);

export const useStoreContext = () => {
  return useContext(StoreContext)
}

const StoreContextProvider = ({ children }) => {

  const [cart, setCart] = useState<any>({})

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const addToCart= async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleUpdateCartQty= async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const handleRemoveFromCart= async (productId: string) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = commerce.cart.empty()
    setCart(cart)
  }
  
  return (
    <StoreContext.Provider value={{ cart, addToCart, fetchCart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }}>
      {children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;