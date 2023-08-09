import React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>
  extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
  UseControllerProps<FormValues> {
  label?: string;
}

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */
function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <FormLabel fontWeight="bold">{label}</FormLabel>}
      <Select<Option, IsMulti, Group>
        options={options}
        focusBorderColor="primary.400"
        {...selectProps}
        {...field}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default ControlledSelect;
