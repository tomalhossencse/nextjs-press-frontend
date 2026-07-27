import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                hostname: "cprcare.com",
            },
            {
                hostname: "www.postplanner.com",
            },
            {
                hostname: "i.ibb.co.com",
            },
            {
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;
