const path = require('path');

module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: '/',
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true
  },
  pwa: {
    name: 'Better Write',
    themeColor: '#4CAF50',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      exclude: [/\.map$/, /_redirects/],
    },
    manifestOptions: {
      name: 'Better Write',
      short_name: 'BWrite',
      start_url: '/',
      display: 'standalone',
      theme_color: '#4CAF50',
      background_color: '#ffffff'
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      Object.assign(args[0]['process.env'], {
        VITE_GROK_API_KEY: JSON.stringify(process.env.VITE_GROK_API_KEY)
      })
      return args
    })
  }
};