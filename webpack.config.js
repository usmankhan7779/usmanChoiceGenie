const path = require('path');
const nodeExternals = require('webpack-node-externals');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: {
    server: './src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'main.server': path.join(__dirname, 'dist', 'server', 'main.bundle.js')
    }
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: [
      /^@agm\/core/
    ]
  })],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
   
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
    
  },
  plugins:[
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src\assets\css/main.css')),
    })
  ]
  
};
