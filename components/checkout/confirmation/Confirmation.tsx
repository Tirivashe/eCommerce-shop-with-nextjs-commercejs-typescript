import { Button, CircularProgress, Divider, Typography } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { useStoreContext } from '../../../utils/context'

let Confirmation: React.FC = () => {
  const { order, reset} = useStoreContext()
  return order.customer ? (
    <>
      <div>
        <Typography variant="h5" gutterBottom>Thank You For Your Purchase {order.customer.firstName} {order.customer.lastName}</Typography>
        <Divider />
        <Typography variant="subtitle2" gutterBottom>Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Link href='/'>
        <Button variant="outlined" type="button" onClick={reset}>Back To Home</Button>
      </Link>
    </>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  )
}

export default Confirmation
