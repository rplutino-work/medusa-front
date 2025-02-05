const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const path = require('path')
const nextTranslate = require('next-translate-plugin')

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "https://medusa-server-production.up.railway.app",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost"
    ],
  },
  images: {
    domains: [
      "https://medusa-server-production.up.railway.app",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost"
    ]
    // remotePatterns: [
    //   // ...
    //   {
    //     protocol: "http", // or https
    //     hostname: MEDUSA_BACKEND_URL,
    //   },
    //   // ...
    // ],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}),



console.log("next.config.js", JSON.stringify(module.exports, null, 2))
