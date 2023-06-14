const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const path = require('path')
const nextTranslate = require('next-translate-plugin')

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
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}),



console.log("next.config.js", JSON.stringify(module.exports, null, 2))
