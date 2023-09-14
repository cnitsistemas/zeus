import { z } from "zod";

export const FormValidationUser = z.object({
    name: z.string().min(4, {
        message: "O nome do aluno deve ter 4 caracteres ou mais.",
    }),
    email: z
        .string()
        .min(1, { message: "Este campo deve ser preenchido." })
        .email()
        .refine((e) => e === "abcd@fg.com", "Este e-mail não está em nosso banco de dados"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    full_name: z.string().min(4),
    phone: z.string().min(10).max(14)
}).refine((data) => data.password === data.confirmPassword, {
    message: "A senha não corresponde",
    path: ["confirmpassword"]
});