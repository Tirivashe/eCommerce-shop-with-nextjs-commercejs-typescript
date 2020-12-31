import React, { createContext, useState, useContext } from 'react';
import { commerce } from '../lib/commerce';
import { useRouter } from 'next/router'

type Value =  {
  cart: any,
  order: any,
  checkoutToken: any,
  activeStep: number,
  shippingData: any,
  addToCart(a: string, b: number): void,
  fetchCart(): void,
  handleUpdateCartQty(a: string, b: number): void,
  handleRemoveFromCart(a: string): void,
  handleEmptyCart(): void,
  handleCaptureCheckout(a: any, b: any): void
  generateToken(a: string, b: string[]): void,
  next(a: any): void,
  nextStep(): void
  backStep(): void,
  reset(): void
}

const StoreContext = createContext<Value>(null);

export const useStoreContext = () => {
  return useContext(StoreContext)
}

const StoreContextProvider = ({ children }) => {
  const router = useRouter()

  const [cart, setCart] = useState<any>({})
  const [order, setOrder] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})

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

  const handleCaptureCheckout = async ( checkoutTokenId: any, newOrder: any ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      console.log("Current order: ", order)
      refreshCart()
    } catch (error) {
      console.log("Cannot capture order: ", error.data.error.message)
    }
  }

  const refreshCart = async () => {
    try {
      const newCart = await commerce.cart.refresh()
      setCart(newCart)
    } catch (error) {
      console.error("Cannot refresh cart: ", error)
    }

  }
  
  const reset = () => { 
    setActiveStep(0)
    setOrder({})
  }
  const generateToken = async (cart_id: string, steps: string[]) => {
    try {
      const token = await commerce.checkout.generateToken(cart_id, { type: 'cart' })
      setCheckoutToken(token)
    } catch (error) {
      if(activeStep !== steps.length){
        router.push('/')
      }
      console.error("Cannot generate token: ", error)
    }
  }

  const nextStep = () => {
    setActiveStep(prevState => prevState + 1)
  }

  const backStep = () => {
    setActiveStep(prevState => prevState - 1)
  }

  const next = data => {
    setShippingData(data)
    nextStep()
  }

  const value= { 
    cart,
    order,
    activeStep,
    checkoutToken,
    shippingData, 
    addToCart, 
    fetchCart, 
    handleUpdateCartQty, 
    handleRemoveFromCart, 
    handleEmptyCart,
    handleCaptureCheckout,
    generateToken,
    next,
    nextStep,
    backStep,
    reset
  }
  
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;