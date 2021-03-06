import React, { useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel,  Typography } from '@material-ui/core'
import useStyles from '../../pageStyles/styles.checkout'
import { AddressForm, PaymentForm, Confirmation } from '../../components'
import { useStoreContext } from '../../utils/context'
import Head from 'next/head'

const steps = ['Shipping Address', 'Payment Details']

const CheckoutForm = () => {
  const classes = useStyles()
  const { cart, activeStep, checkoutToken, generateToken } = useStoreContext()

  useEffect(() => {
    if(cart.id){
      generateToken(cart.id, steps)
    }
  },[cart])

  const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

  return (
    <>
      <Head>
        <title>Welcome To The Shop | Checkout</title>
      </Head>
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
