const path = require('path');

module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: '/',
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups', // ✅ 팝업 opener 허용
      'Cross-Origin-Embedder-Policy': 'unsafe-none',             // ✅ cross-origin 리소스 허용
      'Access-Control-Allow-Origin': '*'                         // ✅ 외부 접근 허용
    }
  },
  pwa: {
    name: 'Momento',
    themeColor: '#4CAF50',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      exclude: [
        /\.map$/, 
        /_redirects/, 
        /^https:\/\/accounts\.google\.com\/.*/, // ✅ Google login 관련 외부 URL 제외
        /^https:\/\/apis\.google\.com\/.*/      // ✅ Google API 호출 제외
      ]
    },
    manifestOptions: {
      name: 'Momento',
      short_name: 'BWrite',
      start_url: '/',           // ✅ 정확한 루트 경로 지정
      display: 'standalone',    // PWA 스타일로 실행
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
