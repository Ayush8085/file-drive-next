"use server";

import { SignUpSchema } from "@/schema";
import z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function signup(formData: z.infer<typeof SignUpSchema>) {
    const validatedData = SignUpSchema.safeParse(formData);
    if (!validatedData.success) {
        return { error: "Invalid data" };
    }

    const { fullName, email, password } = validatedData.data;

    // Check if email is already in use
    const existingUser = await db.user.findUnique({
        where: { email },
    })
    if (existingUser) {
        return { error: "Email already in use" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create the user
    const user = await db.user.create({
        data: {
            name: fullName,
            email,
            password: hashedPassword,
        }
    });

    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Registration successful" };
}