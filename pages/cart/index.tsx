import { Button, Container, Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'
import CartItem from '../../components/cartItem/CartItem'
import useStyles from '../../pageStyles/styles.cart'
import { useStoreContext } from '../../utils/context'

const Cart: FC = () => {
  const { cart, handleEmptyCart } = useStoreContext()
  const classes = useStyles()

  console.log("Whats' in the cart is: ",cart)

  const EmptyCart = () => {
    return(
      <Typography variant="subtitle1">You currently have no items in your cart. 
        <Link href="/"> Add Some Right Now!</Link>
      </Typography>
    )
  }

  const FilledCart = () => {
    return(
      <>
        <Grid container spacing={3}>
          {cart.line_items.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">Subtotal: { cart.subtotal.formatted_with_symbol } </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
            <Link href='/checkout'>
              <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

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
