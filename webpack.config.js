import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'development',
    entry: './pages/MainPage/MainPageChunk.tsx',
    context: '/home/romaro/react-spa/project',
    output: {
        path: '/home/romaro/react-spa/project/_web',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     configFile: 'tsconfig.json',
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader',
                        options: {
                            htmlmin: false,
                            htmlminOptions: {
                                removeComments: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './pages/MainPage/MainPage.ejs',
        }),
    ],
    optimization: {
        minimize: false,
    },
    devServer: {
        static: {
            directory: './_web/views',
        },
        compress: true,
        port: 9000,
    },
};
