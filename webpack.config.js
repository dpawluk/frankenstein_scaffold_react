/* eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractStyles = new ExtractTextPlugin('main.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

var externalAssets = {
  css: [
    'https://assets.zendesk.com/apps/sdk-assets/css/0/zendesk_garden.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/g/lodash@4.14.0,handlebarsjs@4.0.5,jquery@3.1.0',
    'https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js'
  ]
}

module.exports = {
  progress: true,
  entry: {
    app:['react-hot-loader/patch', './src/components/index.jsx', './src/stylesheets/app.scss' ]
  },
  output: {
    path: './dist/assets',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(gif|jpe?g|png|svg|woff2?|ttf|eot)$/,
        loader: 'url-loader?limit=10000&name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: extractStyles.extract("style", ["css?sourceMap&root=" + path.resolve('./dist/assets'), "sass?sourceMap"])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
    		test: /\.jsx?$/,
    		exclude: /(node_modules|bower_components|public\/)/,
    		loader: "babel"
    	}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: '#eval',
  plugins: [
		extractStyles,
		new HtmlWebpackPlugin({
			template: './src/template.html',
      filename: 'index.html',
			files: {
				css: ['styles.css'],
				js: [ "bundle.js"]
			}
		}),
	]
};
