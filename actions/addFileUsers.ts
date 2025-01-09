"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function addFileUsers(fileId: string, emails: string[]) {

    emails.map(async (email: string) => {
        const user = await getUserByEmail(email);

        if (user) {
            // check if already added
            const fileUser = await db.fileUser.findFirst({
                where: {
                    userId: user.id,
                    fileId
                }
            });

            if (!fileUser) {
                await db.fileUser.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id,
                            }
                        },
                        file: {
                            connect: {
                                id: fileId,
                            }
                        }
                    }
                })
            }
        }
    })

    revalidatePath("/");
}