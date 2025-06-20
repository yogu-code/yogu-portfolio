/** @type {import('next').NextConfig} */
export const nextConfig = {
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  images: {
    unoptimized: true, // Optional for GitHub Pages, as it doesn't support Next.js image optimization
  },
};

