/*
* 生产环境：
* HMR/server/
* */

const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
	devtool : '#hidden-source-map',
	entry: {
		index: path.join(__dirname, 'index.js'),
		sdk: path.join(__dirname, 'sdk.js')
	},
	output: {
		filename: "[name].js",
		path:path.join(__dirname,'dist'),
		publicPath: "./"
	},
	mode : 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name].[hash:8].[ext]',
						outputPath: path.join(__dirname,'dist')
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename:'[name].[hash:8].css',
			chunkFilename:'[id].css'
		}),
		// new AnalyzerPlugin(),
		// html入口
		new HtmlPlugin({
			title:'prd_fish-websocket-server',
			filename: 'index.html',
			chunks:['index','venders'],
			template:path.join(__dirname,'template/index.html'),
			inject:'body'
		})
	],
	optimization : {
		minimize:true,	// 压缩
		splitChunks : {
			chunks: 'all',		// initial/async/all(default)
			minSize: 30000,	// 压缩前最小体积为该值（byte）即匹配，(default)
			minChunks: 99999,		// 被引用次数小于等于该值即匹配，1（default）
			maxAsyncRequests: 5,	// 在按需加载模式时，请求数量达到该值即匹配（5 default）
			maxInitialRequests: 3,	// 在初始化加载模式时，引用次数达到该值即匹配（1 default）
			automaticNameDelimiter:'_',	// 自动命名时的块名称之间的连接符号
			name: true,			// 拆出来的文件名字，默认由块名+hash值组成
			// 缓存组继承自以上属性，但可以对他们进行改写
			cacheGroups:{
				commons:{
					test:/[\\/]node_modules[\\/]/,
					name:'venders'
				}
			}
		}
	}
};

module.exports = config;
