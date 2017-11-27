// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    /*生产环境配置项  */
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/index.html'),        //生成的html文件
        assetsRoot: path.resolve(__dirname, '../dist'),              //生成的根文件夹
        assetsSubDirectory: 'static',                                //二级目录名
        assetsPublicPath: './',                                      //静态资源路径
        productionSourceMap: false,                                  //是否启用生产环境的sourceMap
        productionGzip: true,                                        //是否启用gzip静态压缩
        productionGzipExtensions: ['js', 'css'],                     //gzip静态压缩处理的文件
        outputZip: false                                             //是否输出zip压缩包
    },
    /* 开发环境配置项 */
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8081,                                                  //运行端口,也可以在命令行更改 set port=8081 && npm run dev
        autoOpenBrowser: true,                                       //运行自动打开浏览器
        useMockData: true,                                           //mock本地数据
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},                                              //配置跨域代理
        cssSourceMap: false                                          //是否启用cssSourceMap
    }
}
