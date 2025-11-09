module.exports = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  transpilePackages: ['react-wavify'],
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/'
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            svgoConfig: {
              plugins: [
                'preset-default',
                { name: 'removeViewBox', enabled: false }
              ]
            }
          }
        },
        'file-loader'
      ]
    })
    return config
  },
  output: 'export',
  basePath: '/react-wavify',
  assetPrefix: '/react-wavify/',
  trailingSlash: true
}
