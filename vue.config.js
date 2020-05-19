'use strict'
const path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}


// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 8081 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,  // 可以使用花生壳穿透
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            //api
            '/api': {
                //  target: `http://192.168.8.111:6066/api`,
                target: 'http://192.168.2.140:6066/api',
                // target: 'http://263q51340l.wicp.vip:18001/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

        },


    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'app',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

}
