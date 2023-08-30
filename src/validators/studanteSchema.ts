import { z } from "zod";

export const selectSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export const FormValidation = z.object({
    name: z.string().min(4, {
        message: "O nome do aluno deve ter 4 caracteres ou mais.",
    }),
    teaching: selectSchema.required(),
    shift: selectSchema.required(),
    serie: z
        .string()
        .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais." }),

    schoolName: z
        .string()
        .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais." }),
    departureTime: z.string().min(4, { message: "O horário de ida deve ter 4 caracteres ou mais." }),
    backTime: z.string().min(4, { message: "O horário de volta deve ter 4 caracteres ou mais." }),
});