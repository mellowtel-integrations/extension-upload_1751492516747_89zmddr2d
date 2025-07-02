const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { 
    background: './src/background.js', 
    'mellowtel-content': './src/mellowtel-content.js'
  },
  output: { 
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].js', 
    clean: true 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: '**/*', 
          to: '[path][name][ext]',
          filter: (resourcePath) => {
            // Exclude node_modules, src, dist, and build/config files
            return !resourcePath.includes('node_modules') && 
                   !resourcePath.includes('/src/') && 
                   !resourcePath.includes('/dist/') &&
                   !resourcePath.endsWith('package.json') &&
                   !resourcePath.endsWith('package-lock.json') &&
                   !resourcePath.endsWith('webpack.config.js') &&
                   !resourcePath.endsWith('README.md') &&
                   !resourcePath.endsWith('TEAM_APPROVED_README.md');
          }
        }
      ]
    })
  ],
  resolve: { 
    extensions: ['.js'] 
  },
  optimization: { 
    minimize: false 
  }
};