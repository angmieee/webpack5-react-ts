const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: { 
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称 // 加上[chunkhash:8]
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件，webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], //只对项目src文件的ts,tsx进行loader解析
        test: /\.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: ['thread-loader','babel-loader']
      },
      {
        test: /\.css$/, //匹配 css 文件
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
      },
      {
        test: /\.scss$/, //匹配 scss 文件
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名 // 加上[contenthash:8]
        },
      },
      {
        test:/\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name].[contenthash:8][ext]',// 文件输出目录和命名 // 加上[contenthash:8]
        },
      },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{
          filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名 // 加上[contenthash:8]
        },
      }
    ]
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
        '@': path.join(__dirname, '../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}