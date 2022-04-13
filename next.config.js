
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');

module.exports = withBundleAnalyzer(withSourceMaps({
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    return config;
  },
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: "AIzaSyAcSi9nJy77TXVHoiZfhERzez_NlbK3F90",
      authDomain: "nextjs-demo-73e34.firebaseapp.com",
      databaseURL: "https://nextjs-demo-73e34-default-rtdb.firebaseio.com",
      projectId: "nextjs-demo-73e34",
      storageBucket: "nextjs-demo-73e34.appspot.com",
      messagingSenderId: "1031831013463",
      appId: "1:1031831013463:web:7ae2bb5dced97656f63b12",
      measurementId: "G-Y2PKXX0B7V"
    }
  },
}));
