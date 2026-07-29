"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        userInfo: unknown;
    };
};

type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: unknown;
};
export const loginAction = async (
    redirectUrl: string | null,
    prevState: LoginState,
    formData: FormData,
) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password,
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 1,
        });

        const decodeToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (
            redirectUrl &&
            typeof redirectUrl === "string" &&
            redirectUrl.startsWith("/") &&
            !redirectUrl.startsWith("//")
        ) {
            redirect(redirectUrl, "replace");
        }

        if (decodeToken.role === "ADMIN") {
            redirect("/admin-dashboard", "replace");
        } else if (decodeToken.role === "AUTHOR") {
            redirect("/author-dashboard", "replace");
        } else {
            redirect("/dashboard", "replace");
        }
    }

    // console.log(result);

    return result;
};

export const registerAction = async (
    prevState: RegisterState,
    formData: FormData,
) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        name,
        email,
        password,
    };

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/users/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        },
    );

    const result = await res.json();

    return result;
};
