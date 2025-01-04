import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validatedData = LoginSchema.safeParse(credentials);
                if (validatedData.success) {
                    const { email, password } = validatedData.data;
                    const user = await db.user.findUnique({
                        where: { email },
                    })
                    if (!user) {
                        return null;
                    }

                    const matchPassword = await bcrypt.compare(password, user.password);

                    if (!matchPassword) {
                        return null;
                    }

                    return user;
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig