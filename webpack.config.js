const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    watchFiles: {
      paths: ['src/**/*.js'],  // Watch all JS files in src directory
      options: {
        usePolling: true,      // Use polling for better file watching
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 300,     // Delay before rebuilding
    poll: 1000,               // Check for changes every second
    ignored: /node_modules/,   // Don't watch node_modules
  },
  devtool: 'source-map'
}; 