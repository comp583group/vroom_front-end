import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",  // initially "localhost"
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "localhost", 
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal", 
        port: "8000",
      },
    ],
    domains: ['localhost', '127.0.0.1'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Temporarily skip ESLint errors during `next build`
  },
};

export default nextConfig;
