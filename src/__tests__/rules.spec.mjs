const path = require("path");
const fs = require("fs");

const { Spectral } = require("@stoplight/spectral-core");
const { fetch } = require("@stoplight/spectral-runtime"); // can also use isomorphic-fetch, etc.. If you ruleset does not reference any external assets, you can provide some stub instead.
const {
  bundleAndLoadRuleset,
} = require("@stoplight/spectral-ruleset-bundler/with-loader");
const {
  commonjs,
} = require("@stoplight/spectral-ruleset-bundler/plugins/commonjs"); // needed if you want to use CommonJS

const spectral = new Spectral();

beforeAll(async () => {
  const rulesetFilepath = path.join(__dirname, ".spectral.yaml");
  spectral.setRuleset(
    await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch }, [commonjs()])
  );
  return spectral;
});

describe("Testing each rule against example documents", () => {
  test("testing the openapi rule", async () => {
    const badDocument = {
      description: "",
      openapi: "3.1.1",
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(badDocument).then((spectralResultArray) => {
      expect(spectralResultArray).not.toEqual([]);
    });

    const correctDocument = {
      description: "",
      openapi: "3.0.1",
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(correctDocument).then((spectralResultArray) => {
      expect(spectralResultArray).toEqual([]);
    });
  });

  xtest("aws-path-segments", async () => {
    const goodDocument = {
      description: "",
      openapi: "3.0.1",
      paths: {
        "/": {
          post: {
            tags: ["pet"],
            summary: "uploads an image",
            description: "",
            operationId: "uploadFile",
            consumes: ["multipart/form-data"],
            produces: ["application/json"],
          },
        },
      },
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(goodDocument).then((spectralResultArray) => {
      expect(spectralResultArray).toEqual([]);
    });

    const badDocument = {
      description: "",
      openapi: "3.0.1",
      paths: {
        "this should not work": {
          post: {
            tags: ["pet"],
            summary: "uploads an image",
            description: "",
            operationId: "uploadFile",
            consumes: ["multipart/form-data"],
            produces: ["application/json"],
          },
        },
      },
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(badDocument).then((spectralResultArray) => {
      expect(spectralResultArray).not.toEqual([]);
    });
  });
});
