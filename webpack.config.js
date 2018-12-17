const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'vt-dom2tree.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'vtDom2Tree'
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 9000,
    open: true
  }
};