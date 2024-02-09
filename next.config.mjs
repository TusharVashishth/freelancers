/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yjfwnylqusotowscnghx.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
