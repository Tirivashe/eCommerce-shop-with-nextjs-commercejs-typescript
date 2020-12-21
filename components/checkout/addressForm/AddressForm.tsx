import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from '../CustomTextField'
import { commerce } from '../../../lib/commerce'
import Link from 'next/link'
import CustomSelect from '../CustomSelect'

type AddressFormProps = {
  checkoutToken: any,
  next(a : any): void
}

const AddressForm = ({ checkoutToken, next }: AddressFormProps) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()

  const fetchShippingCountries = async (tokenID: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(tokenID)
    console.log(countries)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    console.log(subdivisions)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (tokenID: string, country: string, region: string = null) => {
    const options = await commerce.checkout.getShippingOptions(tokenID, { country, region })
    console.log(subdivisions)
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  const countries = Object.entries(shippingCountries).map(([ code, name ]) => ({ id: code , label: name }))
  console.log(countries)

  const subdivisions = Object.entries(shippingSubdivisions).map(([ code, name ]) => ({ id: code , label: name }))
  console.log(subdivisions)

  const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` }))

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  },[])

  useEffect(() => {
    if(shippingCountry) fetchSubdivisions(shippingCountry)
  },[shippingCountry])

  useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  },[shippingSubdivision])

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            
            <FormInput name="firstName" label="First Name" required/>
            <FormInput name="lastName" label="Last Name" required/>
            <FormInput name="address" label="Address" required/>
            <FormInput name="email" label="Email" required/>
            <FormInput name="city" label="City" required/>
            <FormInput name="zip" label="ZIP/ Postal Code" required/>

            <CustomSelect inputLabel="Shipping Country" stateValue={shippingCountry} options={countries} setState={setShippingCountry}/>
            <CustomSelect inputLabel="Shipping Subdivisions" stateValue={shippingSubdivision} options={subdivisions} setState={setShippingSubdivision}/>
            <CustomSelect inputLabel="Shipping Options" stateValue={shippingOption} options={options} setState={setShippingOption}/>
          </Grid>

          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href='/cart'>
              <Button variant="outlined"> Back to Cart</Button>
            </Link>
            <Button variant="contained" color="primary" type="submit">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm