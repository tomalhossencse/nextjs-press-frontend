"use server";

import { IPostResponse } from "@/lib/types";
import { cookies } from "next/headers";

type NewsQuery = {
    searchTerm?: string | string[];
    page?: string | string[];
    sortBy?: string | string[];
    sortOrder?: string | string[];
};

export const getNews = async ({
    query,
}: {
    query?: NewsQuery;
}): Promise<IPostResponse> => {
    const params = new URLSearchParams();

    const searchTerm = Array.isArray(query?.searchTerm)
        ? query.searchTerm[0]
        : query?.searchTerm;

    const sortBy = Array.isArray(query?.sortBy)
        ? query.sortBy[0]
        : query?.sortBy;

    const sortOrder = Array.isArray(query?.sortOrder)
        ? query.sortOrder[0]
        : query?.sortOrder;

    const page = Array.isArray(query?.page) ? query.page[0] : query?.page;

    if (searchTerm) {
        params.set("searchTerm", searchTerm);
    }

    if (page) {
        params.set("page", page);
    }

    if (sortBy) {
        params.set("sortBy", sortBy);
    }
    if (sortOrder) {
        params.set("sortOrder", sortOrder);
    }

    const queryString = params.toString();

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/posts?limit=6${queryString ? `&${queryString}` : ""}`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["posts"],
            },
        },
    );

    const result = await res.json();

    return result;
};
