import { Button, Grid, Typography } from "@material-ui/core"
import { FC } from "react"
import { useStoreContext } from "../../../utils/context"
import CartItem from "../cartItem/CartItem"
import useStyles from '../../../pageStyles/styles.cart'
import Link from "next/link"


const FilledCart: FC = () => {
  const { cart, handleEmptyCart } = useStoreContext()
  const classes = useStyles()
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

export default FilledCart