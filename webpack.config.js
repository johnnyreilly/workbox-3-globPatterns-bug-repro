const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new WorkboxPlugin({
            // importWorkboxFromCDN: false,

            // we want our service worker to cache the dist directory
            globDirectory: 'dist',

            // these are the sorts of files we want to cache
            globPatterns: ['**/*.{html,js,css,png,svg,jpg,gif,json}'],

            // this is where we want our ServiceWorker to be created
            // swDest: path.resolve('dist', 'sw.js'),

            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};