module.exports = {
  entry: './public/js/index.js',
  mode: 'development',
  stats: { maxModules: Infinity, exclude: false },
  output: {
    path: `${__dirname}/public/js`,
    filename: 'bundle.js',
  },
  devtool: 'source-map',
};
