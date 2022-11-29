const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  // 这个是给webpack-dev-server开启可IP和域名访问权限。
  // chainWebpack: config => {
  //   config.devServer.disableHostCheck(true)
  // },
  // configureWebpack: {
  //   devServer: {
  //     // disableHostCheck: true
  //     allowedHosts: ['www.corho.com'] // www.corho.com=>扫码授权后的回调地址
  //   }
  // },
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  },
  // chainWebpack: config => {
  //   config.devServer.disableHostCheck(true)
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => Object.assign(options, { limit: 10000 }))
  // },
  configureWebpack: {
    devServer: {
      // disableHostCheck: true
      allowedHosts: ['www.corho.com'] // www.corho.com=>扫码授权后的回调地址
    },
    externals: {
      qc: 'QC'
    }
  }
})
