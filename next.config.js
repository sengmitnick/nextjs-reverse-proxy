/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async function () {
    return [
      {
        source: "/v1",
        destination: "/api/v1",
      },
      {
        source: "/v1/:path*",
        destination: "/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
