var path = require("path");

module.exports = {
  entry: "./src/main/js/app.tsx",
  cache: true,
  output: {
    path: __dirname,
    filename: "./src/main/resources/static/built/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|ts|tsx)$/i,
        exclude: /(node_modules)/,
        loaders: ["babel-loader", "ts-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"]
  }
};
