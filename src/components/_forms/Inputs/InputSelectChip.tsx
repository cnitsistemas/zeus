import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useField } from "formik";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type DataProps = {
  value: string;
  label: string;
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InputSelectChip({ ...props }) {
  const theme = useTheme();
  const [field, meta, { setValue }] = useField(props.name);
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl size="small" fullWidth={true} sx={{ mt: 2 }}>
        <InputLabel id="demo-multiple-chip-label">{props.label}</InputLabel>
        <Select
          {...field}
          {...props}
          fullWidth
          labelId={props.id}
          label={props.label}
          multiple
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected: any) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.data.map((item: DataProps) => (
            <MenuItem
              key={item.value}
              value={item.label}
              style={getStyles(item.label, personName, theme)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && (
          <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
