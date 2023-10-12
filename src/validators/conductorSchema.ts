import { object, ref, string } from "yup";
import { TEXTS } from "./constants/conductor";

export const ConductorSchema = () => {
  return object().shape({
    name: string()
      .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
      .required(TEXTS.NAME.ERROR_MSG),
    typeLicence: string()
      .required(TEXTS.TYPE.ERROR_MSG),
    licenseDocumentIdentifier: string()
      .required(TEXTS.IDENTIFICATION.ERROR_REQUIRED)
  });
} 