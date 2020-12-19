import React, { createContext, useState, useContext } from 'react';
import { commerce } from '../lib/commerce';

const StoreContext = createContext<any>(null);

export const useStoreContext = () => {
  return useContext(StoreContext)
}

const StoreContextProvider = ({ children }) => {

  const [cart, setCart] = useState<any>({})

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const addToCart= async (productId: string, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  
  return (
    <StoreContext.Provider value={{ cart, addToCart, fetchCart }}>
      {children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;