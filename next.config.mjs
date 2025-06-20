/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/portfolio",
  images: {
    unoptimized: true, // Required for static export
  },
  output: "export", // Add this line for static export
};
export default nextConfig;
