import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

type TextFieldProps = {
  name: string,
  label: string,
  required?: boolean
}

const CustomTextField = ({ name, label, required }: TextFieldProps) => {
  const { control } = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
      <Controller as={TextField} defaultValue="" control={control} fullWidth name={name} label={label} required={required}/>
    </Grid>
  )
}

export default CustomTextField
