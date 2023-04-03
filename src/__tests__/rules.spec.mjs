const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const { Spectral } = require("@stoplight/spectral-core");
const { fetch } = require("@stoplight/spectral-runtime"); // can also use isomorphic-fetch, etc.. If you ruleset does not reference any external assets, you can provide some stub instead.
const {
  bundleAndLoadRuleset,
} = require("@stoplight/spectral-ruleset-bundler/with-loader");
const {
  commonjs,
} = require("@stoplight/spectral-ruleset-bundler/plugins/commonjs"); // needed if you want to use CommonJS

expect.extend({
  toFailWithRule(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

const spectral = new Spectral({});

let mutableTemplate;

beforeAll(async () => {
  const rulesetFilepath = path.join(__dirname, ".spectral.yaml");
  mutableTemplate = yaml.load(
    fs.readFileSync("examples/petstore_aws.yaml", "utf8"),
    { schema: yaml.DEFAULT_SCHEMA }
  );
  spectral.setRuleset(
    await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch }, [commonjs()])
  );
  return spectral;
});

// beforeEach(async () => {
//   mutableTemplate = undefined;
// });

describe("Testing each rule against example documents", () => {
  test("testing the openapi rule", async () => {
    let badDocument = mutableTemplate;
    badDocument.openapi = "3.1.1";
    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(badDocument).then((spectralResultArray) => {
      expect(spectralResultArray).toFailWithRule({
        code: "aws-openapi-version",
      });
    });
  });

  test("aws-path-segments", async () => {
    let pathSegments = mutableTemplate;
    pathSegments.paths = {
      "this should not work as it has spaces": {
        post: {
          tags: ["pet"],
          summary: "uploads an image",
          description: "",
          operationId: "uploadFile",
          consumes: ["multipart/form-data"],
          produces: ["application/json"],
        },
      },
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(pathSegments).then((spectralResultArray) => {
      expect(spectralResultArray).toFailWithRule({
        code: "aws-path-segments",
      });
    });
  });
});
