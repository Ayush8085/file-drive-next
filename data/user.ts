import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        return user;
    } catch {
        return null;
    }
}

export const currentUser = async()=> {
    try {
        const session = await auth();
        return session?.user;
    } catch (error) {
        return null;
    }
}