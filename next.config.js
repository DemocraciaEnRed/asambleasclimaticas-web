/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    PROJECTID: 'pacto-inter-ciudad',
  },
  output: 'export',
  images: { unoptimized: true }
}

module.exports = nextConfig
