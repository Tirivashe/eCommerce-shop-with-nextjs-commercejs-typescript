import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import { useStoreContext } from '../../utils/context'

const Navbar: React.FC = () => {
  const { cart } = useStoreContext()
  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src="/shopLogo.jpg" alt="commerce" height="50px" className={classes.image}/>
            Shop Here!
          </Typography>
          <div className={classes.grow}/>
          <div>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={cart.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
