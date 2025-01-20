// next.config.js
const { i18n } = require("./next-i18next.config");
const path = require('path');

module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300,
      };
    }
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
};

