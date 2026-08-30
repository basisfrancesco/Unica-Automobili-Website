import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/Unica-Automobili-Website" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/Unica-Automobili-Website/" : "",
};

export default nextConfig;
