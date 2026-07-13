import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pol-marti-portfolio",
  assetPrefix: "/pol-marti-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
