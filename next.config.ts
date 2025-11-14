import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Spécifier explicitement la racine du projet pour éviter les avertissements
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
