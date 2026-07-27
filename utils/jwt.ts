/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
export const verifyToken = async (
    token: string,
    type: "access" | "refresh",
) => {
    try {
        const secret =
            type === "access"
                ? process.env.JWT_ACCESS_SECRET
                : process.env.JWT_REFRESH_SECRET;

        const decode = jwt.verify(token, secret as string);
        return {
            success: true,
            data: decode,
        };
    } catch (error: any) {
        console.log("Token verification Failed");
        return {
            success: false,
            error: error.message,
        };
    }
};
