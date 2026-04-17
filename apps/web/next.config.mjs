/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.lummi.ai",
        pathname: "/assets/**"
      }
    ]
  },
  transpilePackages: [
    '@workspace/ui',
    '@workspace/utils',
    '@workspace/types',
    '@workspace/api-client'
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://lumelabs-api.vercel.app/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ]
  },
}

export default nextConfig
