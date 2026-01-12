import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "k.kakaocdn.net" },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.toss.im" },
      { protocol: "https", hostname: "windfall-bucket.s3.ap-northeast-2.amazonaws.com" },
      { protocol: "https", hostname: "wind-fall.store" },
      { protocol: "http", hostname: "img1.kakaocdn.net" },
      { protocol: "http", hostname: "phinf.pstatic.net" },
      { protocol: "http", hostname: "ssl.pstatic.net" },
      { protocol: "http", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "phinf.pstatic.net" },
      { protocol: "https", hostname: "ssl.pstatic.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
