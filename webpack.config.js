const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {    
    filename: 'main.js',    
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/, // .svg 확장자를 가진 파일을 처리하는 로더 설정
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
