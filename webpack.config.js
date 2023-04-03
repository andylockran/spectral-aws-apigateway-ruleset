const path = require("path");

module.exports = {
  entry: {
    draft4: "./src/draft4.mjs",
  },
  mode: "production",
  // experiments: {
  //   // executeModule: true,
  //   // outputModule: true,
  //   // syncWebAssembly: false,
  //   // topLevelAwait: false,
  //   // asyncWebAssembly: true,
  //   // layers: false,
  //   // lazyCompilation: false,
  // },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "functions"),
    library: {
      type: "this",
      export: ["draft4"],
    },
  },
  // externals: {
  //   "ajv": "require('ajv')"
  // }
};
