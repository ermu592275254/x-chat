// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: { // production 环境
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: '', // 编译输出的二级目录
    assetsPublicPath: '', //编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: false, // 是否生成资源地图
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
  },
  dev: {
    env: require('./dev.env'),
    port: 8889, // 端口号
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}, //  需要 proxyTable 代理的接口（可跨域）
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
