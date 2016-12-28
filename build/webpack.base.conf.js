var path = require('path') // 使用 NodeJS 自带的文件路径插件
var config = require('../config') // 引入 config/index.js
var utils = require('./utils') // 引入一些小工具
var projectRoot = path.resolve(__dirname, '../') // 拼接我们的工作区路径为一个绝对路径

/* 将 NodeJS 环境作为我们的编译环境 */
var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
/* 是否在 dev 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
/* 是否在 production 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
/* 最终是否使用 cssSourceMap */
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  // 配置入口文件
  entry: {
    app: './src/main.js'
  },
  // 配置输出路径(静态路径)文件名
  output: {
    path: config.build.assetsRoot,  // 编译输出的静态资源根路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js' // 编译输出的文件名
  },

  resolve: {
    // 自动补全的扩展名
    extensions: ['', '.js', '.vue', '.json'],
    // 不进行自动补全或处理的文件或者文件夹
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    // 需要处理的文件及使用的 
    //loader loaders是你用在app源码上的转换元件。他们是用node.js运行的，把源文件作为参数，返回新的资源的函数
    loaders: [
      {
        test: /\.vue$/, //一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
        loader: 'vue' // loader的名称（必须）
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot, //手动添加必须处理的文件（文件夹）
        exclude: /node_modules/ //屏蔽不需要处理的文件（文件夹）（可选）；
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url', // 这里是指用到的loader的名称  'url-loader'
        query: { // 为loaders提供额外的设置选项（可选）
          limit: 10000, //文件小于limit将被转化为data url 默认不转化 单位是b
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 转换之后文件的路径
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('./fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    // .vue 文件配置 loader 及工具 (autoprefixer)
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
