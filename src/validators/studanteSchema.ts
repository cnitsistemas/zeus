import { string, object } from "yup";
import { TEXTS } from "./constants/students";

export const StudentSchema = () => {
  return object().shape({
    name: string()
      .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
      .required(TEXTS.NAME.ERROR_MSG),
    schoolName: string()
      .min(TEXTS.SCHOOL.MIN, TEXTS.SCHOOL.ERROR_MIN)
      .required(TEXTS.SCHOOL.ERROR_MSG),
    serie: string()
      .required(TEXTS.SERIE.ERROR_MSG),
    teaching: string()
      .required(TEXTS.TEACHING.ERROR_MSG),
    shift: string()
      .required(TEXTS.SHIFT.ERROR_MSG),
  });
} 