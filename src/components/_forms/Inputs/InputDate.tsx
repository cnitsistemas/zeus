"use client"
import { useField } from 'formik'
import { FormControl } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

export const InputDate = (props: any) => {
  const [field, meta, { setValue }] = useField(props.name)

  return (
    <FormControl fullWidth>
      <DatePicker
        {...field}
        {...props}
        margin="normal"
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onChange={(value) => setValue(value)}
        sx={{ marginTop: 2 }}
      />
    </FormControl>
  )
}