"use server";

import { IPostResponse } from "@/lib/types";
import { cookies } from "next/headers";

type NewsQuery = {
    searchTerm?: string | string[];
    page?: string | string[];
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

    const page = Array.isArray(query?.page) ? query.page[0] : query?.page;

    if (searchTerm) {
        params.set("searchTerm", searchTerm);
    }

    if (page) {
        params.set("page", page);
    }

    const queryString = params.toString();

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/posts${queryString ? `?${queryString}` : ""}`,
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
