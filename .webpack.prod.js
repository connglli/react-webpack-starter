const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlgin = require('clean-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;

// we create html by the template file
const htmlPlugin = new HtmlWebpackPlugin({
  title: 'modal tunnel',
  filename: 'index.html',
  template: path.join(__dirname, 'src/index.html.tpl')
});
// we extract all styles to index.css
const cssPlugin = new ExtractTextWebpackPlugin('index.css');
const uglifyPlugin = new UglifyJsWebpackPlugin();
// define the env
const definePlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
// we will clean build/* before run build
const cleanPlugin = new CleanWebpackPlgin(['build']);

module.exports = {
  devtool: 'source-map', // source map
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [ cleanPlugin, htmlPlugin, cssPlugin, definePlugin, uglifyPlugin ],
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
            cache: true, // allow eslint to cache its temp result into node_modules/.cache
            configFile: path.join(__dirname, '.eslintrc.json')
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ ['es2015', { modules: false }], 'react' ],
              plugins: [ 'transform-async-to-generator', 'transform-class-properties', 'transform-object-rest-spread' ]
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use: cssPlugin.extract({
          fallback: { loader: 'style-loader' },
          use: [
            { 
              loader: 'css-loader',
              options: {
                module: true
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  }
}