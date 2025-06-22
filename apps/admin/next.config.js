/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/core-data", "@repo/core-domain"],
  images: {
    remotePatterns: [new URL("https://images.pexels.com/**")],
  },
};

export default nextConfig;
