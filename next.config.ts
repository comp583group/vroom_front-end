import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Temporarily skip ESLint errors during `next build`
  },
};

export default nextConfig;
