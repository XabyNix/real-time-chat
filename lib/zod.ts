import { z } from "zod";

export const LoginSchema = z
	.object({
		email: z
			.string({
				invalid_type_error: "L'email deve contenere dei caratteri",
				required_error: "Necessaria",
			})
			.email({ message: "Indirizzo email non valido" }),
		password: z
			.string({
				invalid_type_error: "La password deve contenere di caratteri",
				required_error: "Necessaria",
			})
			.min(8, { message: "La password deve essere lunga almeno 8 caratteri " })
			.max(18, { message: "La password puo avere massimo 18 caratteri" }),
	})
	.required();

export const RegisterSchema = z.object({
	name: z
		.string()
		.min(1, { message: "E' Obbligatorio" })
		.max(30, { message: "Massimo 30 caratteri" }),
	email: z
		.string({
			invalid_type_error: "L'email deve contenere dei caratteri",
			required_error: "Necessaria",
		})
		.email({ message: "Indirizzo email non valido" }),
	password: z
		.string({
			invalid_type_error: "La password deve contenere di caratteri",
			required_error: "Necessaria",
		})
		.min(8, { message: "La password deve essere lunga almeno 8 caratteri " })
		.max(18, { message: "La password puo avere massimo 18 caratteri" }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
