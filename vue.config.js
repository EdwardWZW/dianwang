module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://180.167.180.242:28082',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
