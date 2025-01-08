"use server";

import { db } from "@/lib/db";
import { convertFileToUrl, getFileType, parseStringify } from "@/lib/utils";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";
import fs from "fs";

export default async function uploadFile({ file, ownerId, path }: UploadFileProps) {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to uploads folder
    const pathname = join(process.cwd(), "public", "uploads", file.name);
    await writeFile(pathname, buffer);

    // store to db
    const newFile = await db.file.create({
        data: {
            type: getFileType(file.name).type,
            name: file.name,
            url: convertFileToUrl(file),
            extension: getFileType(file.name).extension,
            size: file.size,
            owner: {
                connect: {
                    id: ownerId
                }
            }
        }
    }).catch((err) => {
        fs.unlink(pathname, (unlinkErr) => {
            if (unlinkErr) console.error("Failed to delete file", unlinkErr);
        });
        console.log("Something went wrong!!");
    });

    if (newFile) {
        await db.fileUser.create({
            data: {
                file: {
                    connect: {
                        id: newFile.id,
                    }
                },
                user: {
                    connect: {
                        id: ownerId,
                    }
                }
            }
        })
    }

    revalidatePath(path);

    return parseStringify(newFile);
}