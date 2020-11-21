const path = require("path")
const webpack = require("webpack")

const testPath = path.resolve(__dirname, "test")
const nodeModules = path.resolve(__dirname, "node_modules")
const buildPath = path.resolve(testPath, "build")

console.log(`====> Base build directory: [${buildPath}]`)

const wpc = {
  entry: {
    main: path.resolve(testPath, "index.tsx")
  },
  devtool: "source-map",
  output: {filename: "[name].js", path: buildPath},
  module: {
    rules: [{test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/}]
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    modules: [nodeModules, path.resolve(__dirname)],
    alias: {
      react: path.resolve(nodeModules, "preact/compat"),
      "react-dom": path.resolve(nodeModules, "preact/compat")
    }
  },
  optimization: {minimize: false}
}

module.exports = wpc
