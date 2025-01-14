const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry points: include all your HTML and JS files here
  entry: {
    app: "./docs/js/index.js", // Main entry JS file (make sure this is your starting JS file)
  },

  // Output settings
  output: {
    filename: "js/[name].[contenthash].js", // Name pattern for bundled JS files
    path: path.resolve(__dirname, "dist"), // Output folder for everything
    clean: true, // Clean the output folder before each build
  },

  // Handling various file types
  module: {
    rules: [
      // Handle JS files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Optional: use Babel to transpile JS
      },

      // Handle CSS files with CSS modules
      {
        test: /\.css$/,
        use: [
          "style-loader", // Inject styles into DOM
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]", // Generate hashed class names
              },
            },
          },
        ],
      },

      // Handle HTML files with HtmlWebpackPlugin
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }, // Minimize HTML files
          },
        ],
      },

      // Handle assets (images, fonts, etc.)
      {
        test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },

  // Plugins
  plugins: [
    // HTML Webpack Plugin for each HTML file
    new HtmlWebpackPlugin({
      template: "./docs/index.html", // Template HTML file
      filename: "index.html", // Output filename for the HTML
    }),

    // Automatically add more HTML files
    new HtmlWebpackPlugin({
      template: "./docs/anotherpage.html", // Add more HTML files here
      filename: "anotherpage.html", // Output filename for another HTML page
    }),

    // More HTML Webpack Plugins can be added for other pages
  ],

  // Webpack optimization for production
  optimization: {
    minimize: true, // Enable minification for production
  },

  // Enable source maps for debugging (optional)
  devtool: "source-map",

  // Set mode (production is best for minification)
  mode: "production",
};
