const path = require('path');
const webpack = require('webpack');

const devServer = {
  contentBase: path.join(__dirname, 'build'), // 静态文件 (如 index.html) 的地址
  // open: true, // 启动 dev server 时打开浏览器
  // publicPath: path.join(__dirname) // index.html 中引用文件 (如 bundle.js) 的地址
  // inline: true, // inline 自动刷新模式，默认开启，改为 false 将启用 iframe 模式，使用 HMR 建议使用 inline 模式
};

module.exports = {
  devtool: 'inline-source-map', // source map
  devServer: devServer,
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [ ['es2015', { modules: false }], 'react' ],
              plugins: [ 'transform-async-to-generator', 'transform-class-properties', 'react-hot-loader/babel' ]
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              module: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              module: true
            }
          }
        ]
      }
    ]
  }
}