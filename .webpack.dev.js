const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;

// we create html by the template file
const htmlPlugin = new HtmlWebpackPlugin({
  title: 'modal tunnel',
  filename: 'index.html',
  template: path.join(__dirname, 'src/index.html.tpl')
});
// we extract all styles to index.css
const cssPlugin = new ExtractTextWebpackPlugin('index.css');
// define the env
const definePlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});

const devServer = {
  contentBase: path.join(__dirname, 'build'), // URL of static files e.g. index.html
  // open: true, // open browser when start dev server
  // publicPath: path.join(__dirname) // URL of refed files e.g. bundle.js of index.html
  // inline: true, // autorefresh mode: inline，open by default，mode iframe will be open when set to false，inline is recommended when use HMR
};

module.exports = {
  devtool: 'cheap-module-eval-source-map', // source map
  devServer: devServer,
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [ htmlPlugin, cssPlugin, definePlugin ],
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
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [ ['es2015', { modules: false }], 'react' ],
              plugins: [ 'transform-async-to-generator', 'transform-class-properties', 'react-hot-loader/babel', 'transform-object-rest-spread' ]
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