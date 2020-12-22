import Link from 'next/link'
import React, { FC } from 'react'
import { Typography } from '@material-ui/core'

const EmptyCart: FC = () => {
  return(
    <Typography variant="subtitle1">You currently have no items in your cart. 
      <Link href="/"> Add Some Right Now!</Link>
    </Typography>
  )
}

export default EmptyCart