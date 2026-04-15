import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'static0.makeuseofimages.com',
      'img.youtube.com',
    ],
  },
  output: 'standalone',
}

export default nextConfig;
