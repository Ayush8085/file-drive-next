"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function removeFileUser(userId: string, fileId: string) {
    //check if owner of file
    const file = await db.file.findUnique({
        where: {
            id: fileId
        }
    })

    if(file?.ownerId === userId) return;
    
    await db.fileUser.deleteMany({
        where: {
            fileId: fileId,
            userId: userId,

        }
    });

    revalidatePath("/");
}