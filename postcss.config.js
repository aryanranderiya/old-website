module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // require("postcss-modules")({
    //   generateScopedName: "[hash:base64:8]", // Custom obfuscation pattern
    // }),
    require("postcss-obfuscator")({
      // ids: true,
      srcPath: "docs",
      desPath: "build",
      extensions: [".html", ".js"],
      // htmlExcludes: ["navbar.html", "cursor.html", "footer.html"],
      // classIgnore: ["cursor", "lenis"],
      // // multi: true,
      keepData: false,
      showConfig: true,
      callBack: function () {
        console.log("Obfuscation done.");
      },
    }),
  ],
};
