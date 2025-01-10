"use server";

import { currentUser } from "@/data/user";
import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export default async function getFiles({ types = [], searchText = "", sort = "", limit }: GetFilesProps) {
    const user = await currentUser();

    if (!user) {
        return [];
    }

    // Build the query dynamically based on the passed parameters
    const whereConditions: any = {
        userId: user.id,
    };

    // Add type filtering if `types` is provided
    if (types && types.length > 0) {
        whereConditions.file = {
            type: {
                in: types, // Filters by file types
            },
        };
    }

    // Add searchText filtering if `searchText` is provided
    if (searchText && searchText.trim() !== "") {        
        whereConditions.file = {
            ...whereConditions.file, // Preserve type filter if already present
            name: {
                contains: searchText.toLowerCase(), // Convert the search text to lowercase
                // For MySQL/SQLite, manually handle case-insensitivity with `lower` or `upper` functions.
                // Example for MySQL, use `LOWER(name)` in the query directly.
            },
        };
    }    


    // Handle sorting (if provided)
    // const orderBy = sort
    //     ? {
    //         [sort]: "asc", // Sort by the specified field in ascending order (adjust as needed)
    //     }
    //     : undefined;    

    // Perform the database query with dynamic filters
    const files = await db.fileUser.findMany({
        where: whereConditions,
        include: {
            file: {
                include: {
                    owner: true,
                },
            },
            user: true,
        },
        // orderBy, // Add sorting if defined
    });    


    return parseStringify(files);
}