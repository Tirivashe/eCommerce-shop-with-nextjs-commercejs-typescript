import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './product/Product'
import useStyles from './styles'

type ProductsProps = {
  products: any,
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const classes= useStyles()

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justify="center" spacing={4}>
        {products.map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products
