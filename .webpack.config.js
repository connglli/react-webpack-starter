const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map', // source map
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'es2015', 'react' ],
            plugins: [ 'transform-async-to-generator', 'transform-class-properties' ]
          }
        }
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