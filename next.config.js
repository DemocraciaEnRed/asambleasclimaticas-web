/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  // Cada página se exporta como carpeta/index.html, así /pt/ y /es/asambleas/br/ funcionan en cualquier hosting estático.
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
