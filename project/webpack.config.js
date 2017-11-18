var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const VENDOR = ["faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "redux",
  "redux-form",
  "redux-thunk",
  "react-router"
];

module.exports = {
  entry: {vendor: VENDOR,bundle: './src/index.js'},
  output: {
    path: path.join(__dirname, 'dist'),
    // 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
    // [chunkhash]会自动根据文件是否更改而更换哈希
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
    // vendor 的意义和之前相同
    // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendor', 'manifest'],
      // 配合 manifest 文件使用
      minChunks: Infinity
    }),
    // 只删除 dist 文件夹下的 bundle 和 manifest 文件
    new CleanWebpackPlugin(['dist/bundle.*.js','dist/manifest.*.js'], {
    // 打印 log
      verbose: true,
      // 删除文件
      dry: false
    }),
    // 我们这里将之前的 HTML 文件当做模板
  // 注意在之前 HTML 文件中请务必删除之前引入的 JS 文件
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules:[
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
