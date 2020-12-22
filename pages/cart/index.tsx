import { Container, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import EmptyCart from '../../components/Cart/emptyCart/EmptyCart'
import FilledCart from '../../components/Cart/FilledCart/FilledCart'
import useStyles from '../../pageStyles/styles.cart'
import { useStoreContext } from '../../utils/context'

const Cart: FC = () => {
  const { cart } = useStoreContext()
  const classes = useStyles()

  return cart.line_items !== undefined ? (
    
    <Container className={classes.container}>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        {cart.line_items.length === 0  ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  ) : (<h1>Loading ...</h1>)
}

export default Cart
