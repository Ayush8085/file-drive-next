"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export default async function getTotalSpaceUsed() {
    const user = await currentUser();
    if (!user) {
        return { error: "User is not authenticated." };
    }

    const files = await db.file.findMany({
        where: {
            owner: {
                id: user.id,
            }
        }
    });

    const totalSpace = {
        image: { size: 0, latestDate: "" },
        document: { size: 0, latestDate: "" },
        video: { size: 0, latestDate: "" },
        audio: { size: 0, latestDate: "" },
        other: { size: 0, latestDate: "" },
        used: 0,
        all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };

    files.forEach((file) => {
        const fileType = file.type as FileType;
        totalSpace[fileType].size += file.size;
        totalSpace.used += file.size;
        totalSpace[fileType].latestDate = file.createdAt;

    });

    return parseStringify(totalSpace);
}
