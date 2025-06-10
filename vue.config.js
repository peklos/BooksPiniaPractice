// vue.config.js
const { defineConfig } = require('@vue/cli-service');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: {
    plugins: [
      // явно включаем плагин извлечения CSS
      new MiniCssExtractPlugin({
        // опции по желанию, например:
        // filename: 'css/[name].[contenthash:8].css',
        // chunkFilename: 'css/[name].[contenthash:8].css',
      })
    ]
  }
});
