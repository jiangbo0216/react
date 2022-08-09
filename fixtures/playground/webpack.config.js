
const { resolve } = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {DefinePlugin} = require('webpack')

function getAlias () {
    const dirs = fs.readdirSync(resolve(__dirname, '../../packages'))

    return dirs.reduce((prev, dir) => {
        prev[dir] = resolve(__dirname, `../../packages/${dir}/`)
        return prev
    }, {})
}

module.exports = {
    mode: 'development',
    module: {

    },
    entry: resolve(__dirname, './src/index.jsx'),
    output: {
        path: resolve(__dirname, './build'),
        filename: 'main.js',
      },
    devtool: 'eval-cheap-source-map',
    devServer: {
        static: resolve(__dirname, './dist'),
        port: 8000,
        /* 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。
     * 将 devServer.historyApiFallback 设为 true开启：
     **/
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jsx|js)?$/,
                use: {
                    loader: 'babel-loader',
                }
                
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./src/index.html"),
        }),
        new DefinePlugin({
            __DEV__: true,
            __EXPERIMENTAL__: true,
            __EXTENSION__: false,
            __PROFILE__: false,
            __TEST__: process.env.NODE_ENV === 'test',
            'process.env.DEVTOOLS_PACKAGE': `"react-devtools-inline"`,
          }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'shared/ReactSharedInternals': resolve(__dirname, '../../packages/react/src/ReactSharedInternals.js'),
            './ReactFiberHostConfig': resolve(__dirname, '../../packages/react-reconciler/src/forks/ReactFiberHostConfig.dom.js'),
            ...getAlias(),
            'scheduler': resolve(__dirname, './scheduler.js'),
        }
    },
    
}