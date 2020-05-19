
module.exports = {
    entry: {
        context: path.resolve(__dirname, '../'),
        entry: {
            app: ["babel-polyfill", "./src/main.js"],
        }
    },
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                resolve('src'),
            ]
        },
    ]
};
