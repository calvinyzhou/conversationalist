/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/conversationalist',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
