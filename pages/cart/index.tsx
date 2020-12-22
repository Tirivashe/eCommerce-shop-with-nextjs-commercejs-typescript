import { Container, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import EmptyCart from '../../components/Cart/emptyCart/EmptyCart'
import FilledCart from '../../components/Cart/FilledCart/FilledCart'
import useStyles from '../../pageStyles/styles.cart'
import { useStoreContext } from '../../utils/context'

const Cart: FC = () => {
  const { cart } = useStoreContext()
  const classes = useStyles()

  if(cart === null){
    return(
      <h1>Loading...</h1>
    )
  } 

  return (
    <Container className={classes.container}>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        {cart === undefined || cart.line_items.length === 0  ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  )
}

export default Cart
