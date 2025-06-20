/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/portfolio",
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};
export default nextConfig;
