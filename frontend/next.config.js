/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Only add rewrites if API URL is configured (for development or if backend is on same domain)
    if (apiUrl) {
      return [
        {
          source: '/api/uploads/:path*',
          destination: `${apiUrl}/uploads/:path*`,
        },
      ];
    }
    
    return [];
  },
};

module.exports = nextConfig;

