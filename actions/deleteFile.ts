"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { join } from "path";
import fs from "fs";

export default async function deleteFile(fileId: string) {
    let file = null;
    // delete from db
    try {
        file = await db.file.delete({
            where: {
                id: fileId,
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in file deletion process:", error.message);
        } else {
            console.error("Unknown error in file deletion process:", error);
        }
    }

    if (!file) return;

    // delete from storage
    const pathname = join(process.cwd(), "public", "uploads", file.name);
    fs.unlink(pathname, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file", unlinkErr);
    });

    revalidatePath("/");
}