const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyPlugin = require('./plugins/index')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        // chunkFilename: '[name].[contenthash:8].js',
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: 'html-loader',
            //         },
            //     ],
            // },
            {
                test: /\.js/,
                use: [path.resolve(__dirname, './loaders/replaceLoader.js')]
            },
            {
                test:  /\.html$/,
                use: [path.resolve(__dirname, './loaders/htmlLoader.js')]
            },
            // {
            //     test: /\.jpg$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //         },
            //     ],
            // },
        ],
    },
    plugins: [
        new MyPlugin()
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'learn_webpack',
        //     template: 'public/index.html',
        // }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10,
            // minChunks: 1,
            // automaticNameDelimiter: '~',
            // maxAsyncRequests: 1,
            cacheGroups:{
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    maxSize: 1000*1000,
                    filename: "venders-ramda.js" //修改分割后生成文件名
                },
                lodash: {
                    test: /[\\/]lodash[\\/]/,
                    priority: 0,
                    filename: "venders-lodash.js" //修改分割后生成文件名
                },
                // default: {
                //     test: /[\\/]loader[\\/]/,
                //     priority: -20,
                //     maxSize: 100,
                //     filename: "venders-default.js"
                // }
            }
        }
    }
};
