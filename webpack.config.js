const path = require('path');

const HtmlWebpackPlugin     = require('html-webpack-plugin');
const TerserPlugin          = require('terser-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true },
                    },
                ],
            },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
            extractors: [
                {
                    extractor: (content) => {
                        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                    },
                    extensions: ['html', 'js', 'jsx', 'ts', 'tsx'],
                },
            ],
        })
    ]
};
