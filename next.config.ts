import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(
  __dirname,
  "src/visual-edits/component-tagger-loader.js",
);
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    qualities: [85, 90, 95, 100],
  },

  // Chemin de sortie explicite et sûr
  distDir: ".next",

  // Tolérer TS/ESLint au build si besoin
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // N’activer le loader Orchids qu’en dev
  ...(isDev && {
    turbopack: {
      rules: { "*.{jsx,tsx}": { loaders: [LOADER] } },
    },
  }),
};

export default nextConfig;
