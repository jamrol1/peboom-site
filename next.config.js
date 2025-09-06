/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "C:/pagefile.sys",
          "/pagefile.sys",
        ],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
