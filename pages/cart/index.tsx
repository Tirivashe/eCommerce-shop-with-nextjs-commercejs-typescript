import { Container, Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useStyles } from '../../pageStyles/styles'

const Cart: FC = () => {
  const classes = useStyles()
  const isEmpty = true

  const EmptyCart = () => {
    return(
      <Typography variant="subtitle1">You currently have no items in your cart</Typography>
    )
  }

  const FilledCart = () => {
    return(
      <>
        <Grid container spacing={3}>
          {}
        </Grid>
      </>
    )
  }

  return (
    <Container>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
        {isEmpty ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  )
}

export default Cart
