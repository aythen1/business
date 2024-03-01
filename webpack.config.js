module.exports = {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
    },
  ],
  // fallback: {
  //   stream: require.resolve('stream-browserify'),
  // },
  // resolve.fallback: { "stream": false }
  // ... otras configuraciones ...
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      // stream: false,
      stream: require.resolve('stream-browserify'),
      // path: require.resolve("path-browserify"),
      path: false
    },
  },
};