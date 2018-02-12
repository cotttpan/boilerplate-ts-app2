const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const NotifierPlugin = require('webpack-notifier')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const compact = require('lodash.compact')
const MinifyPlugin = require('babel-minify-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const rxPaths = require('rxjs/_esm5/path-mapping')

module.exports = env => {
  console.log('ENV: ', env) // tslint:disable-line

  const NODE_ENV = process.env.NODE_ENV || 'development'
  const ENV = env.production ? 'production' : 'development'
  const isProd = env.production || NODE_ENV === 'production'

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: ['./index.ts', './index.scss'],
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].bundle.js',
    },
    devServer: {
      contentBase: 'public',
      historyApiFallback: true,
      noInfo: true,
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
    plugins: compact([
      new NotifierPlugin({ title: 'Webpack' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }),
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './index.ejs',
        hash: true,
        inject: false,
        env: ENV,
      }),
      new ExtractTextPlugin({
        filename: '[name].bundle.css',
      }),
      isProd && new webpack.optimize.ModuleConcatenationPlugin(),
      isProd && new MinifyPlugin(),
    ]),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        // ...rxPaths(),
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devtool: isProd ? false : 'inline-source-map',
  }
}

