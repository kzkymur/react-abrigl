import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

export default {
	mode: 'development',
	entry: src + '/index.jsx',

  devtool: 'eval-source-map',

	output: {
		path: dist,
		publicPath: "/",
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.(txt|(f|v)s)$/,
				exclude: /node_modules/,
				loader: 'raw-loader'
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sc|c)ss$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(mp4|gif|jpg|jpeg|png|svg)$/,
				exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: '/img/',
        },
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
    alias: { '@': src },
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: src + '/index.html',
			filename: 'index.html'
		})
	],
	devServer: {
		port: 8080,
    hot: true,
		historyApiFallback: true, 
	},
};
