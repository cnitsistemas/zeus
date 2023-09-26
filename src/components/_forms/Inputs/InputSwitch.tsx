"use client";
import { useEffect, useState } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Switch,
  styled,
  SwitchProps,
  FormLabel,
} from "@mui/material";

export const CustomSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  margin: 10,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#ff7a2d" : "#ff7a2d",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#ff7a2d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const InputSwitch = ({ ...props }) => {
  const [field, meta, { setValue }] = useField(props.name);
  const [selectedValue, setSelectedValue] = useState(props.checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
    setSelectedValue(event.target.checked);
  };

  useEffect(() => {
    setSelectedValue(props.checked);
  }, [props.checked]);

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          label={""}
          control={
            <CustomSwitch
              {...field}
              {...props}
              checked={selectedValue}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </FormGroup>
      {meta.error && (
        <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};
