import { regexEmail } from "@/utils/regex";

export const TEXTS = {
	EMAIL: {
		ERROR_MSG: "O campo Email é obrigatório",
		FORMAT_ERROR_MSG: "O Campo Email está fora do padrão",
		TEST_FN: (value: string) => regexEmail.test(value),
		NAME: "email",
	},
	PASS: {
		MIN: 8,
		ERROR_REQUIRED: "Campo senha é obrigatório",
		TEST_NAME: "password",
	},
}