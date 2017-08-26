const path = require('path');
const webpack = require('webpack');

const devServer = {
  contentBase: path.join(__dirname, 'build'), // URL of static files e.g. index.html
  // open: true, // open browser when start dev server
  // publicPath: path.join(__dirname) // URL of refed files e.g. bundle.js of index.html
  // inline: true, // autorefresh mode: inline，open by default，mode iframe will be open when set to false，inline is recommended when use HMR
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
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,        
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true // allow eslint to cache its temp result into node_modules/.cache
          }
        }
      },
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