"use client";
import { useField } from "formik";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

type DataProps = {
  value: string;
  label: string;
};

export const InputSelect = ({ ...props }) => {
  const [field, meta, { setValue }] = useField(props.name);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      error={meta.touched && !!meta.error}
      sx={{ mt: 2 }}
      size="small"
    >
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        {...field}
        {...props}
        labelId={props.id}
        label={props.label}
        onChange={handleChange}
      >
        {props.data.map(({ value, label }: DataProps) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};
