/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  // Every page is exported as folder/index.html, so /pt/ and /es/asambleas/br/ work on any static host.
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
