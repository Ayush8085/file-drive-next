import z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const SignUpSchema = z.object({
    email: z.string().email(),
    fullName: z.string().min(2).max(50),
    password: z.string().min(6),
});