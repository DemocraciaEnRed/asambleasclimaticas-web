/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_SIDE_PROJECTID: process.env.PROJECTID,
    CLIENT_SIDE_APIURL: process.env.APIURL
  },
}

module.exports = nextConfig
