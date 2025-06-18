/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://images.pexels.com/**")],
  },
};

export default nextConfig;
