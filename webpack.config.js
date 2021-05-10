const path = require("path");

module.exports = {
  entry: {
    draft4: "./src/draft4.mjs",
  },
  mode: "production",
  // experiments: {
  //   executeModule: false,
  //   outputModule: true,
  //   syncWebAssembly: false,
  //   topLevelAwait: false,
  //   asyncWebAssembly: true,
  //   layers: false,
  //   lazyCompilation: false,
  // },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "functions")
    // library: {
    //   type: "module",
    //   export: ["validate_json"]
    //}
  },
  // externals: {
  //   "ajv": "require('ajv')"
  // }
};
