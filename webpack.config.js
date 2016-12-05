const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = !(process.env.NODE_ENV === 'production');

function getEntrySources(sources) {
  if (devMode) {
    sources.push('webpack-hot-middleware/client');
  }
  return sources;
}

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(Object.assign({
      NODE_ENV: process.env.NODE_ENV || 'development',
    }, require('./env.json'))),
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
];

module.exports = {
  devtool: 'source-map',
  entry: {
    app: getEntrySources([
      path.join(__dirname, 'src', 'index.js'),
    ]),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        include: path.join(__dirname, 'src'),
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: [
          /node_modules/,
        ],
        loader: 'react-hot!babel', // Include the react-hot loader
      }, {
        test: /\.(scss|sass)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader!cssnext-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?prefix=img/&limit=5000',
      },
      {
        test: /\.(woff(2)?|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?prefix=font/&limit=5000',
      },
    ],
  },
  // PostCSS plugins go here
  postcss: function (webpack) {
    return [
      require('autoprefixer'),
      require('precss'),
    ]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true, // Activate hot loading
  },
  plugins: basePlugins.concat(devMode ? devPlugins : prodPlugins),
};
