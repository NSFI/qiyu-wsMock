/*
* 开发环境：
* HMR/server/
* */

const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');

const config = {
	cache:true,
	devtool : '#cheap-module-eval-source-map',
	devServer : {
		host:'0.0.0.0',
		port:'8080',
		overlay:true,
		hot:true
	},
	entry: {
		index:path.join(__dirname,'index.js'),
		sdk: path.join(__dirname, 'sdk.js')
	},
	output: {
		filename: "[name].js",
		path:path.join(__dirname,'dist')
	},
	mode : 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test:/\.(sc|c)ss$/,
				exclude: /node_modules/,
				use:[
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader'
				}
			}
		]
	},
	plugins: [
		// 显示模块相对路径，比如HMR更新时显示的信息
		new Webpack.NamedModulesPlugin(),
		// 开启HMR
		new Webpack.HotModuleReplacementPlugin(),
		// html入口
		new HtmlPlugin({
			title:'dev_fish-websocket-server',
			filename: 'index.html',
			chunks:['index','venders'],
			template:path.join(__dirname,'template/index.html'),
			inject:'body'
		})
	]
};

module.exports = config;
