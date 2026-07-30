import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only optimizes qualities named here — an open-ended `quality`
    // prop would let anyone request arbitrary re-encodes off the image route.
    // 75 is the default every hero and card uses; 65 is the case-study
    // surface thumbnails, which render at about a quarter of the hero's width.
    qualities: [65, 75],
  },
};

export default nextConfig;
