"use server";

import { LoginSchema } from "@/schema";
import z from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";

export default async function login(formData: z.infer<typeof LoginSchema>) {
    const validatedData = LoginSchema.safeParse(formData);
    if (!validatedData.success) {
        return { error: "Invalid data" };
    }

    const { email, password } = validatedData.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return { error: "User not found!" };
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return { error: "Invalid password" };
    }

    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful" };
}