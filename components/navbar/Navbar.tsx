import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import { useStoreContext } from '../../utils/context'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
  const { cart } = useStoreContext()
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" className={classes.title} color="inherit">
              <img src="/shopLogo.jpg" alt="commerce" height="50px" className={classes.image}/>
              Shop Here!
            </Typography>
          </Link>
          <div className={classes.grow}/>
          <div>
            { cart !== undefined && router.pathname === '/' ?
            <IconButton aria-label="Show cart items" color="inherit">
              <Link href="/cart">
                <Badge badgeContent={cart.total_items} color="secondary">
                  <ShoppingCart />
                </Badge>
              </Link>
            </IconButton> : null}
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
