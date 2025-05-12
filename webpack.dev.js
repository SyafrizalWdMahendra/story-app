const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "docs"),
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },

  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:html|js|css|json)$/,
          handler: "StaleWhileRevalidate",
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            },
          },
        },
      ],
    }),
  ],
});
