var path = require("path");

module.exports = {
  entry: "./src/main/js/app.js",
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
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  }
};
