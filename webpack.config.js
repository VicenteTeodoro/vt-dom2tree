const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'node',
  output: {
    filename: 'vt-dom2tree.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'vtDom2Tree',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 9000,
    open: true
  }
};