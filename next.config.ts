import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75],
  },
  async redirects() {
    return [
      {
        source: "/archive",
        destination: "/atlas",
        permanent: true,
      },
      {
        source: "/archive/:slug",
        destination: "/atlas/:slug",
        permanent: true,
      },
      {
        source: "/garage",
        destination: "/machines",
        permanent: true,
      },
      {
        source: "/garage/:slug",
        destination: "/machines/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
