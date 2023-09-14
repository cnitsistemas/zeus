import { FormControl, FormControlLabel, Checkbox } from '@mui/material'

export const InputCheck = ({ field: { ...fields }, ...props }) => (
  <FormControl fullWidth>
    <FormControlLabel
      label={props.label}
      control={<Checkbox {...fields} {...props} />}
    />
  </FormControl>
)