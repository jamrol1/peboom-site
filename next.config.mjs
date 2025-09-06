/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Opsional: ijinkan load <iframe> dex
  // headers: async () => [
  //   {
  //     source: "/(.*)",
  //     headers: [
  //       { key: "X-Frame-Options", value: "ALLOWALL" },
  //     ],
  //   },
  // ],
};
module.exports = nextConfig;
