/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "gmnzkansjbhcrjxgzfam.supabase.co",
        protocol: "https",
        port: ""
      }
    ]
  }
};

module.exports = config;
