'use strict'

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'client')

module.exports = {
  context: srcPath,
  entry: {
    vendor: [
      'react',
      'lodash',
      'react-router',
      'react-router-dom',
      'react-dom',
      'immutable',
      'moment',
      'antd',
      'bluebird',
      'axios',
      'babel-polyfill',
      'core-js'
    ]
  },
  output: {
    path: path.join(srcPath, 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      context: srcPath, // 必填项，用来标志manifest中的路径
      path: path.join(srcPath, 'dll', '[name]-manifest.json'), // 必填项，存放manifest的路径
      name: '[name]' // 必填项，manifest 的 name, 这里这里要与 output.library 名字保持一致
    })
  ]
}
