import { URL } from 'url';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInjector from 'html-webpack-injector';

const projDir = path.join(new URL('.', import.meta.url).pathname, 'project');
const outDir = path.join(projDir, '_web');
const srcDir = path.join(projDir, '');

const pages = ['MainPage'];

function getPageEntryPoints() {
    const obj = {};

    pages.forEach((pageName) => {
        const templatePath = `.${path.sep}` + path.join('pages', pageName, pageName + 'Chunk.tsx');
        obj[pageName] = templatePath;
    });

    return obj;
}

function getPagePlugins() {
    const arr = [];

    pages.forEach((pageName) => {
        /**
         * Пушим инстансы HtmlWebpackPlugin, поскольку
         * на каждую страницу требуется отдельный
         * экземпляр
         */
        arr.push(
            new HtmlWebpackPlugin({
                template: path.join('pages', pageName, pageName + '.ejs'),
                filename: path.join('views', pageName + '.html'),
                /**
                 * Элементами массива являются названия чанок
                 * из объекта, переданного в опцию entry
                 */
                chunks: ['web', pageName],
            }),
        );

        /**
         * Плагин добавляет к странице ссылку на чанку
         */
        arr.push(new HtmlWebpackInjector());
    });

    return arr;
}

export default {
    mode: 'development',
    entry: {
        web: './web.ts',
        MainPage: './pages/MainPage/MainPageChunk.tsx',
    },
    context: srcDir,
    output: {
        path: outDir,
        filename: 'js/[name].js',
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
                        options: {
                            configFile: 'tsconfig.web.json',
                        },
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
    plugins: [new CleanWebpackPlugin(), ...getPagePlugins()],
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                /**
                 * Все импорты, которые приходят из node_modules,
                 * будут упакованы в этот чанк
                 */
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: {
        static: {
            directory: path.join(outDir, 'views'),
        },
        compress: true,
        port: 9000,
    },
};
