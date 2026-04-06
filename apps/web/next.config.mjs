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
  ]
}

export default nextConfig
