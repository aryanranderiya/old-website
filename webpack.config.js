const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

// Dynamically create an entry point for each JavaScript file in `docs/js`
const jsFiles = fs
  .readdirSync(path.resolve(__dirname, "docs/js"))
  .filter((file) => file.endsWith(".js"))
  .reduce((entries, file) => {
    const name = path.basename(file, ".js"); // Use the file name (without extension) as the entry name
    entries[name] = path.resolve(__dirname, `docs/js/${file}`);
    return entries;
  }, {});

module.exports = {
  externals: {
    "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js": "marked",
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js": "firebase",
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js":
      "firebase.database",
    "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js":
      "firebase.storage",
  },
  entry: jsFiles, // Separate entry points for each JS file
  output: {
    filename: "js/[name].js", // Each file will have its own output
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64:8]", // Obfuscate class names
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "docs"), // Copy everything from the `docs` folder
          to: path.resolve(__dirname, "build"), // Output to the `build` folder
          globOptions: {
            ignore: ["**/js/**"], // Exclude JavaScript files, as they are bundled
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: [".js"],
  },
};
