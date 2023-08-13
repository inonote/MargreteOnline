const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/app.ts"
  },  
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  
  /*optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          output: {
            comments: false,
            beautify: false
          },
          mangle: {
            properties: { regex: /^_/ },
          }
        }
      })
    ]
  }*/
};
