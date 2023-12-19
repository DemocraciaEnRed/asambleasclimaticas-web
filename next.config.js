/** @type {import('next').NextConfig} */
const { i18n } = require('./i18n');

const nextConfig = {
  env: {
    PROJECTID: 'pacto-inter-ciudad',
  },
  i18n,
}

module.exports = nextConfig
