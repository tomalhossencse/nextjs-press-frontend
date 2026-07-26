import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];
const authorRoutes = ["/author-dashboard"];
const adminRoutes = ["/admin-dashboard"];
const userRoutes = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    // console.log(request.nextUrl.pathname);
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("accessToken")?.value as string;
    const decodeToken = jwt.decode(accessToken) as JwtPayload;

    if (authRoutes.includes(pathname) && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (adminRoutes.includes(pathname) && decodeToken.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (
        authorRoutes.includes(pathname) &&
        decodeToken.role !== "AUTHOR"
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (userRoutes.includes(pathname) && decodeToken.role !== "USER") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
