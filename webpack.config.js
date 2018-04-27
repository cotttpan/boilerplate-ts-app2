const path = require('path')
const webpack = require('webpack')
const NotifierPlugin = require('webpack-notifier')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = (NODE_ENV === 'production')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./index.ts', './index.scss'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(\/node_modules\/|\.test\.tsx?$)/,
        loader: 'awesome-typescript-loader?module=es2015',
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            `css-loader?importLoaders=3&minimize=${isProd}`,
            'postcss-loader',
            'sass-loader',
            'import-glob-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NotifierPlugin({ title: 'Webpack' }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.ejs',
      hash: true,
      inject: false,
      env: NODE_ENV,
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      disable: !isProd,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isProd ? 'none' : 'inline-source-map',
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  },
}
