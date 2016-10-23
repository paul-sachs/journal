import path from 'path';
import webpack from 'webpack';
require('dotenv').config({ silent: true });

export default {
  entry: path.resolve(__dirname, '../fe', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: { filename: 'app.js', path: '/' },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_CLIENT_DOMAIN: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN)
      }
    })
  ]
};