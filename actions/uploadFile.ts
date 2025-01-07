"use server";

import { db } from "@/lib/db";
import { getFileType, parseStringify } from "@/lib/utils";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";
import { v4 as uuid } from "uuid";

export default async function uploadFile({ file, ownerId, path }: UploadFileProps) {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to uploads folder
    const pathname = join("/", "serious/nextjs/file-drive/uploads", file.name);
    await writeFile(pathname, buffer);

    // store to db
    const newFile = await db.file.create({
        data: {
            type: getFileType(file.name).type,
            name: file.name,
            url: pathname,
            extension: getFileType(file.name).extension,
            size: file.size,
            owner: {
                connect: {
                    id: ownerId
                }
            }
        }
    }).catch((err) => {
        // TODO: delete file from uploads folder
        console.log("Something went wrong!!");
    });

    console.log("newFile: ", newFile);
    

    revalidatePath(path);

    return parseStringify(newFile);
}