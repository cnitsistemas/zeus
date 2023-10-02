import { object, ref, string } from "yup";
import { TEXTS } from "./constants/vehicles";

export const VehiclesSchema = (valueType: string | undefined) => {
  return object().shape({
    description: string()
      .max(TEXTS.DESCRIPTION.MAX, TEXTS.DESCRIPTION.ERROR_MAX)
      .required(TEXTS.DESCRIPTION.ERROR_MSG),
    type: string()
      .required(TEXTS.TYPE.ERROR_MSG),
    identification: string().when([], {
      is: () => valueType !== "Embarcação",
      then: (schema) => schema.required(TEXTS.IDENTIFICATION.ERROR_REQUIRED)
        .matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/,
          TEXTS.IDENTIFICATION.ERROR_REGEX)
    }),
  });
} 