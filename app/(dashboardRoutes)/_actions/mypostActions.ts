"use server";

import { IPostResponse } from "@/lib/types";
import { getNewAccessTokenByRefreshToken } from "@/services/refreshToken";
import { verifyToken } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createPost = async (
    prevState: IPostResponse,
    formData: FormData,
) => {
    const payload = {
        title: formData.get("title"),
        content: formData.get("content"),
        thumbnail: formData.get("thumbnail"),
        tags: (formData.get("tags") as string).split(", "),
        isPremium: formData.get("isPremium") === "on",
    };

    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const decodeAccessToken = accessToken
        ? ((await verifyToken(accessToken, "access")) as JwtPayload)
        : null;

    const decodeRefreshToken = refreshToken
        ? ((await verifyToken(refreshToken, "refresh")) as JwtPayload)
        : null;

    if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
        const result = await getNewAccessTokenByRefreshToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });

            accessToken = newAccessToken;
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            // Authorization: accessToken,
            // Authorization: `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`,
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result?.success) {
        revalidateTag("my-posts", {
            expire: 0,
        });
    }

    if (result?.success && result?.data.isPremium) {
        revalidateTag("premium-posts", {
            expire: 0,
        });
    } else {
        revalidateTag("posts", {
            expire: 0,
        });
    }

    // console.log(result);

    return result;
};

export const getMyposts = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/posts/my-posts`,
        {
            headers: {
                "Content-Type": "application/json",
                // Authorization: accessToken,
                // Authorization: `${accessToken}`,
                // Authorization : `Bearer ${accessToken}`,
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ["my-posts"],
            },
        },
    );

    const result = await res.json();

    return result;
};

export const updatePost = async (
    postId: string,
    prevState: IPostResponse,
    formData: FormData,
) => {
    const payload = {
        title: formData.get("title") ?? "",
        content: formData.get("content") ?? "",
        thumbnail: formData.get("thumbnail") ?? "",
        tags: (formData.get("tags") as string).split(", ") ?? [],
        isPremium: formData.get("isPremium") === "on",
    };

    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const decodeAccessToken = accessToken
        ? ((await verifyToken(accessToken, "access")) as JwtPayload)
        : null;

    const decodeRefreshToken = refreshToken
        ? ((await verifyToken(refreshToken, "refresh")) as JwtPayload)
        : null;

    if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
        const result = await getNewAccessTokenByRefreshToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });

            accessToken = newAccessToken;
        }
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                // Authorization: accessToken,
                // Authorization: `${accessToken}`,
                // Authorization : `Bearer ${accessToken}`,
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        },
    );

    const result = await res.json();

    if (result?.success) {
        revalidateTag("my-posts", {
            expire: 0,
        });
    }

    if (result?.success && result?.data.isPremium) {
        revalidateTag("premium-posts", {
            expire: 0,
        });
    } else {
        revalidateTag("posts", {
            expire: 0,
        });
    }

    // console.log(result);

    return result;
};
