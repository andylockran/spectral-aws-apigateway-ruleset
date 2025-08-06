import * as fs from "node:fs";
import { join } from "path";
import { readFileSync } from "fs";
import { load, DEFAULT_SCHEMA } from "js-yaml";

import { Spectral } from "@stoplight/spectral-core";
import { fetch } from "@stoplight/spectral-runtime"; // can also use isomorphic-fetch, etc.. If you ruleset does not reference any external assets, you can provide some stub instead.
import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";

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
  const rulesetFilepath = join(__dirname, "../../aws_important_notes.yml");
  mutableTemplate = load(
    readFileSync("examples/petstore_aws.yaml", "utf8"),
    { schema: DEFAULT_SCHEMA }
  );
  spectral.setRuleset(
    await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch })
  );
  return spectral;
});

// beforeEach(async () => {
//   mutableTemplate = undefined;
// });

describe("Testing each rule against example documents", () => {
  xtest("aws-openapi-version should fail if the openapi version is set to 3.1.1", async () => {
    let badDocument = mutableTemplate;
    badDocument.openapi = "3.0.1";
    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(badDocument).then((spectralResultArray) => {
      expect(spectralResultArray).toFailWithRule({
        code: "aws-openapi-version",
      });
    });
  });

  test("aws-path-segments should fail if the path contains spaces", async () => {
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

  test("aws-path-segments should not fail if the path is just a /", async () => {
    let pathSegments = mutableTemplate;
    pathSegments.paths = {
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
    };

    // we lint our document using the ruleset we passed to the Spectral object
    spectral.run(pathSegments).then((spectralResultArray) => {
      expect(spectralResultArray).not.toFailWithRule({
        code: "aws-path-segments",
      });
    });
  });
});
