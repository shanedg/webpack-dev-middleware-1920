const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}, argv = {}) => {

  return {
    devServer: {
      // Uncomment the line below to reproduce
      // historyApiFallback: true
    },

    plugins: [
      new HtmlWebpackPlugin(),
    ],
  };
};
