import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";
import { getNewAccessTokenByRefreshToken } from "./services/refreshToken";
import { cookies } from "next/headers";
import { getSubscriptionStatus } from "./app/(publicRoutes)/_actions/getSubscriptionStatus";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/news", "/news/:id"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // console.log(request.nextUrl.pathname);
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodeAccessToken = accessToken
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
            decodeAccessToken = (await verifyToken(
                accessToken!,
                "access",
            )) as JwtPayload;
        }
    }

    let userRole = null;

    if (!decodeAccessToken?.success) {
        cookieStore.delete("accessToken");
    }

    if (decodeAccessToken?.success && decodeAccessToken?.data) {
        userRole = decodeAccessToken.data.role;
    }

    // Authenticated user not allowed to access auth routes

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "ADMIN") {
            return NextResponse.redirect(
                new URL("/admin-dashboard", request.url),
            );
        } else if (userRole === "AUTHOR") {
            return NextResponse.redirect(
                new URL("/author-dashboard", request.url),
            );
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route),
    );

    const isAuthRoute = AUTH_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route),
    );

    // Unauthenticated user not allowed to access protected routes
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Autorization: Role-based access control

    if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (
        pathname.startsWith("/author-dashboard") &&
        userRole !== "AUTHOR"
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (pathname.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // if (pathname === "/payment") {
    //     const statusResult = await getSubscriptionStatus();

    //     const isActive = Boolean(
    //         statusResult?.success && statusResult.data?.isSubscribed,
    //     );

    //     if (isActive) {
    //         return NextResponse.redirect(new URL("/premium", request.url));
    //     }
    // }

    if (pathname === "/premium") {
        const statusResult = await getSubscriptionStatus();

        const isActive = Boolean(
            statusResult?.success && statusResult.data?.isSubscribed,
        );

        if (!isActive) {
            return NextResponse.redirect(new URL("/payment", request.url));
        }
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
