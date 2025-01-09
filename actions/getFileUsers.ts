"use server";

import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export default async function getFileUsers(fileId: string) {
    const users = await db.fileUser.findMany({
        where: {
            fileId,
        },
        include: {
            user: true,
        }
    });

    return parseStringify(users);
}