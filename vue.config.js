const { defineConfig } = require('@vue/cli-service')
// elementPlus自动按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    // elementPlus自动按需导入插件
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  transpileDependencies: true
})
