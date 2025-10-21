/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // ✅ allow UploadThing-hosted images
      },
    ],
  },
};

export default nextConfig;
