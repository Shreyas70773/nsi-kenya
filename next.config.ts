import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitemap and llms.txt both declare trailing-slash URLs; mirror that for
  // the runtime so links resolve consistently.
  trailingSlash: true,
};

export default nextConfig;
