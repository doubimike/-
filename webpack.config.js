const path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin")



module.exports = {
	entry: './app/index.js', // 入口文件
	output: {
		path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
		filename: "bundle.js" // 打包后输出文件的文件名
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			// 图片格式正则
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				// 配置 url-loader 的可选项
				options: {
					// 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
					limit: 10000,
					// 超出限制，创建的文件格式
					// build/images/[图片名].[hash].[图片格式]
					name: 'images/[name].[hash].[ext]'
				}
			}]
		}, {
			test: /\.css$/,
			// 写法和之前基本一致
			loader: ExtractTextPlugin.extract({
				// 必须这样写，否则会报错
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						modules: true
					}
				}]
			})
		}]
	},
	plugins: [
		// 输出的文件路径
		new ExtractTextPlugin("css/[name].[hash].css")
	]
}