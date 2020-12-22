import React, { FC } from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'
import Review from './review/Review'
import { useStoreContext } from '../../../utils/context'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const Payment: FC = () => {
  const { handleCaptureCheckout, checkoutToken, shippingData, nextStep, backStep } = useStoreContext()

  const handleSubmit = async( e: React.FormEvent<HTMLFormElement>, elements: StripeElements, stripe: Stripe) => {
    e.preventDefault()
    if(!stripe || !elements) return
    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })
    if(error){
      console.error("Cannot create payment method: ",error)
    }else{
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { 
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry 
        },

        billing: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry 
        },

        fulfillment: {
          shipping_method: shippingData.shippingOption
        },
        payment: {
          gateway: 'stripe',
          stripe:{
            payment_method_id: paymentMethod.id
          }
        }
      }
      handleCaptureCheckout(checkoutToken.id, orderData)
      nextStep()

    }
  }
  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent:"space-between" }}>
                <Button variant="outlined" onClick={ backStep }>Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default Payment