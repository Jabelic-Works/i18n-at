import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["i18n-at"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
