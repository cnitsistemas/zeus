import { object, ref, string } from "yup";
import { TEXTS } from "./constants/users";

export const UserSchema = () => {
  return object().shape({
    name: string()
      .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
      .required(TEXTS.NAME.ERROR_MSG),
    email: string()
      .email(TEXTS.EMAIL.ERROR_MSG)
      .test(TEXTS.EMAIL.NAME, TEXTS.EMAIL.FORMAT_ERROR_MSG, (value) =>
        TEXTS.EMAIL.TEST_FN(value as string)
      )
      .required(TEXTS.EMAIL.ERROR_MSG),
    password: string()
      .required(TEXTS.PASS.ERROR_REQUIRED)
      .matches(/\w*[a-z]\w*/, TEXTS.PASS.ERROR_SMALL)
      .matches(/\w*[A-Z]\w*/, TEXTS.PASS.ERROR_CAP)
      .matches(/\d/, TEXTS.PASS.ERROR_NUMBER)
      .matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, TEXTS.PASS.ERROR_SPECIAL)
      .min(
        TEXTS.PASS.MIN,
        ({ min }) => `Campo senha precisa ter no mínimo ${min} caracteres`
      ),
    cpassword: string()
      .required(TEXTS.PASS.ERROR_CONFIRM_REQUERED)
      .oneOf([ref("password")], TEXTS.PASS.ERROR_NOMATCH),
  });
} 