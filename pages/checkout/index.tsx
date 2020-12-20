import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel,  Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from '../../pageStyles/styles.checkout'
import { AddressForm, PaymentForm, Confirmation } from '../../components'
import { commerce } from '../../lib/commerce'
import { useStoreContext } from '../../utils/context'

const steps = ['Shipping Address', 'Payment Details']

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()
  const { cart } = useStoreContext()

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
      setCheckoutToken(token)
      console.log(token)
    } catch (error) {
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

  useEffect(() => {
    generateToken()
  },[cart])

  const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData}/>

  return (
    <>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default CheckoutForm
