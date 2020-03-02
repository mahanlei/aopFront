const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // 指定入口文件
  // 这里我们在src文件夹下创建一个index.tsx
  entry: "./src/index.tsx",
  // 指定输出文件名
  output: {
    filename: "main.js"
  },
  resolve: {
    // 自动解析一下拓展，当我们要引入src/index.ts的时候，只需要写src/index即可
    // 后面我们讲TS模块解析的时候，写src也可以
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    // 配置以.ts/.tsx结尾的文件都用ts-loader解析
    // 这里我们用到ts-loader，所以要安装一下
    // npm install ts-loader -D
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader',
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory( /** options */)]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ],
        exclude: /node_modules/
      },
     
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            // options: {
            //   importLoaders: 1,
            //   modules: true,
            //   namedExport: true,
              // camelCase: true,
              // minimize: true,
              // localIdentName: '[path][name]__[local]--[hash:base64:5]',
            // },
          },
          {
            loader: 'less-loader',
            // options: {
            //   javascriptEnabled: true,
              //modifyVars: themeVariables,
            // },
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'url-loader'
      },
      {test: /\.jsx$/, loader: "jsx-loader"}
    ]
  },
  // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生产source-map
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  // 这里使用webpack-dev-server，进行本地开发调试
  devServer: {
    contentBase: "./dist",
    stats: "errors-only",
    compress: false,
    host: "localhost",
    port: 8080,
  },
  // 这里用到两个插件，所以首先我们要记着安装
  // npm install html-webpack-plugin clean-webpack-plugin -D
  plugins: [
    // 这里在编译之前先删除dist文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./dist"]
    }),
    // 这里我们指定编译需要用模板，模板文件是./src/template/index.html，所以接下来我们要创建一个index.html文件
    new HtmlWebpackPlugin({
      template: "./src/template/index.html"
    }),
    new ExtractTextPlugin("styles.css"),

  ]
};