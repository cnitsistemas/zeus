"use client"
import { useState } from 'react'
import { useField } from "formik"
import { FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox } from "@mui/material"

export const InputCheckBox = ({ ...props }) => {
  const [field, meta, { setValue }] = useField(props.name)
  const [selectedValue, setSelectedValue] = useState(props.checked)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked)
    setSelectedValue(event.target.checked)
  }

  return (
    <FormControl
      fullWidth
      variant="standard"
      component="fieldset"
    >
      <FormGroup>
        <FormControlLabel
          label={props.label}
          control={
            <Checkbox
              {...field}
              {...props}
              onChange={handleChange}
              checked={selectedValue}
            />
          }
        />
      </FormGroup>
      {
        meta.error && (
          <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>
        )
      }
    </FormControl>
  );
};
