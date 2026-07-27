"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
    query,
}: {
    query?: { [key: string]: string | string[] | undefined };
}) => {
    // not good approch
    // const searchTerm = `${
    //     search?.searchTerm ? `?searchTerm=${search?.searchTerm}` : ""
    // }`;

    const params = new URLSearchParams();

    if (query && query.searchTerm) {
        params.set("searchTerm", query.searchTerm as string);
    }

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["premuim-posts"],
            },
        },
    );

    const result = await res.json();

    return result;
};
