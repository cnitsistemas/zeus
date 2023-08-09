import InputMask from "react-input-mask";
import React from "react";
import {
    useController,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import { Input, FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";

interface ControlledInputMaskProps<
    FormValues extends FieldValues = FieldValues,
>
    extends UseControllerProps<FormValues> {
    placeholder?: string;
    label?: string;
    mask?: string;
}

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */
function CustomInputMask<
    FormValues extends FieldValues = FieldValues
>({
    name,
    label,
    control,
    rules,
    shouldUnregister,
    placeholder,
    mask,
    ...selectProps
}: ControlledInputMaskProps<FormValues>) {
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
            <Input
                as={InputMask}
                mask={mask}
                maskChar={null}
                {...selectProps}
                {...field}
                placeholder={placeholder}
                focusBorderColor='primary.400'
            />
        </FormControl>
    );
}

export default CustomInputMask;