import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // The image optimizer needs a Next server, which a static export doesn't have.
    unoptimized: true,
  },
  // Lets phones on the same Wi-Fi load the dev server by the computer's network address.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  experimental: {
    // The root layout lives under app/[lang], so there's no single layout to build a 404 from.
    globalNotFound: true,
  },
};

export default nextConfig;
