"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export default async function getFiles() {
    const user = await currentUser();

    if (!user) {
        return [];
    }

    const files = await db.fileUser.findMany({
        where: {
            userId: user.id,
        },
        include: {
            file: {
                include: {
                    owner: true
                }
            },
            user: true
        }
    })


    return parseStringify(files);
}