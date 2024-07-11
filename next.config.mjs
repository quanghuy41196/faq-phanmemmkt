/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true
  },
  
};

export default nextConfig;
