"use client"
import { useField } from 'formik'
import { FormControl, TextField } from '@mui/material'

export const InputText = (props: any) => {
  const [field, meta, { setValue }] = useField(props.name)

  return (
    <FormControl fullWidth>
      <TextField
        {...field}
        {...props}
        margin="normal"
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </FormControl>
  )
}