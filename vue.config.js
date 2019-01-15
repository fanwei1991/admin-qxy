module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://manage.yecaodai.com/',
        changeOrigin: true
      }
    },
    port: 8081
  }
}
