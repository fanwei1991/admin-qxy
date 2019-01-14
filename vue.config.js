module.exports = {
  publicPath: process.env.BASE_URL || '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://manage.yecaodai.com/',
        changeOrigin: true
      }
    }
  }
}
