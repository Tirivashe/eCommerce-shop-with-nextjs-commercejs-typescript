import { Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

type CustomSelectProps = {
  inputLabel: string,
  stateValue: string,
  options: Option[],
  setState(a: HTMLSelectElement["value"]): void
}

type Option = {
  id: string,
  label: string
}

const CustomSelect = ({ inputLabel, options, stateValue, setState } : CustomSelectProps) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select value={stateValue} fullWidth onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(e.target.value)}>
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
        </MenuItem>
        ))}
      </Select>
    </Grid>
  )
}

export default CustomSelect
