const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyPlugin = require('./example/plugins/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // mode: 'production',
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
            // {
            //     test:  /\.html$/,
            //     use: [resolve( './example/loaders/htmlLoader.js')]
            // },
            // {
            //     test: /\.js/,
            //     include: resolve( './src/loader/'),
            //     use: [{
            //         loader: resolve( './example/loaders/replaceLoader.js'),
            //         options:{
            //             cacheDirectory:true
            //         }
            //     }],
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ["@babel/preset-env"]  // 也可以写成presets:['babel-preset-env']
                    // }
                },
                exclude: '/node_modules/'
            }

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
        // new MyPlugin(),
        new CleanWebpackPlugin()
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'learn_webpack',
        //     template: 'public/index.html',
        // }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            minChunks: 1,
            maxSize: 1,
            // maxInitialRequests: 1,
            // maxAsyncRequests: 1,
            // name: 'splitChunks',
            automaticNameDelimiter: '~',
            cacheGroups:{
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 0,
                    // maxSize: 1000*1000,
                    filename: "venders-ramda.js", //修改分割后生成文件名
                },
                lodash: {
                    test: /[\\/]lodash[\\/]/,
                    priority: 10,
                    // maxSize: 1000*1000,
                    filename: "venders-lodash.js" //修改分割后生成文件名
                },
                // loader: {
                //     test: /[\\/]loader[\\/]/,
                //     priority: 10,
                //     maxSize: 100,
                //     // maxSize: 1000*1000,
                //     filename: "venders-[name].js" //修改分割后生成文件名
                // },
                // default: {
                //     test: /[\\/]testui[\\/]/,
                //     priority: 20,
                //     maxSize: 10000,
                //     filename: "venders-default.js"
                // }
            }
        }
    }
};
