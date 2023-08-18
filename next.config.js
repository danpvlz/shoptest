/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost:3000', 'cdn.shopify.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
