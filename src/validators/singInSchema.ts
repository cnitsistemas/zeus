import { string, object } from "yup";
import { TEXTS } from "./constants/singin";

export const SingInSchema = () => {
	return object().shape({
		email: string()
			.email(TEXTS.EMAIL.ERROR_MSG)
			.test(TEXTS.EMAIL.NAME, TEXTS.EMAIL.FORMAT_ERROR_MSG, (value) =>
				TEXTS.EMAIL.TEST_FN(value as string)
			)
			.required(TEXTS.EMAIL.ERROR_MSG),
		password: string()
			.required(TEXTS.PASS.ERROR_REQUIRED)
			.min(
				TEXTS.PASS.MIN,
				({ min }) => `Campo senha precisa ter no mínimo ${min} caracteres`
			),
	});

} 