const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  // Enable webpack analyzer in production build
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      }
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
