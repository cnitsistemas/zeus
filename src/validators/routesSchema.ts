import { string, object } from "yup";
import { TEXTS } from "./constants/routes";

export const RoutesSchema = () => {
  return object().shape({
    name: string()
      .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
      .required(TEXTS.NAME.ERROR_MSG),
    schoolName: string()
      .min(TEXTS.SCHOOL.MIN, TEXTS.SCHOOL.ERROR_MIN)
      .required(TEXTS.SCHOOL.ERROR_MSG),
  });
} 