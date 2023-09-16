import { regexEmail } from "@/utils/regex";

export const TEXTS = {
	NAME: {
		MAX: 200,
		ERROR_MSG: "O campo Nome no app é obrigatório",
		ERROR_MAX: "O Campo Nome no app deve ter no máximo 200 caracteres",
		NAME: "name",
	},
	EMAIL: {
		ERROR_MSG: "O campo Email é obrigatório",
		FORMAT_ERROR_MSG: "O Campo Email está fora do padrão",
		TEST_FN: (value: string) => regexEmail.test(value),
		NAME: "email",
	},
	PASS: {
		MIN: 8,
		ERROR_REQUIRED: "Campo senha é obrigatório",
		ERROR_SMALL: "Campo senha precisa ter letras minúsculas",
		ERROR_CAP: "Campo senha é precisa ter letras maiúsculas",
		ERROR_SPECIAL: "Campo senha é precisa ter caracteres especiais",
		ERROR_NUMBER: "Campo senha é precisa ter números",
		ERROR_CONFIRM: "Campo senha é obrigatório",
		ERROR_CONFIRM_REQUERED: "Campo confirmar senha é obrigatório",
		ERROR_NOMATCH: "Campo confirmar senha é diferente da senha",
		TEST_NAME: "password",
	},
}