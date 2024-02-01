module.exports = {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
    },
  ],
  // ... otras configuraciones ...
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      // path: require.resolve("path-browserify"),
      path: false
    },
  },
};