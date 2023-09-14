"use client"
import { useField } from 'formik'
import { useState } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const InputPassword = ({ ...props }) => {
  const [field, meta, { setValue }] = useField(props.name)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl fullWidth sx={{ margin: '12px 0' }} variant="outlined">
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        {...field}
        {...props}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={props.label}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        error={meta.touched && !!meta.error}
        onChange={({ target: { value } }) => setValue(value)}
      />
      {(meta.touched && meta.error) && (
        <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>)}
    </FormControl>
  )
}