
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'),
    },
    module : {
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader','css-loader'],
            }, 
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from:'./src/style.css', to: 'style.css'},
            ],
        }),
    ],  
};