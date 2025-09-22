import z from "zod";

export const signUpSchema = z.object({
	name: z.string().trim().min(2).max(255),
	email: z.email().toLowerCase().trim(),
	password: z.string().min(6).max(255),
	role: z.enum(["user", "admin"]).default("user"),
});

export const signInSchema = z.object({
	email: z.email().toLowerCase().trim(),
	password: z.string().min(3),
});
