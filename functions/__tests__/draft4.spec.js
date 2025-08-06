import draft4 from "../draft4";
import { load, DEFAULT_SCHEMA } from "js-yaml";
import { readFileSync } from "fs";
import AMV from "apigw-model-validator";

const validator = new AMV();

describe("JSONSchema Compile All", () => {
  test("A schema should compile across all $refs", () => {
    const input = load(
      readFileSync("examples/petstore_aws.yaml", "utf8"),
      { schema: DEFAULT_SCHEMA }
    );
    const output = [];
    expect(draft4(input)).toEqual(output);
  });

  test("An object should match the schema", (done) => {
    const input = load(
      readFileSync("examples/petstore_aws.yaml", "utf8"),
      { schema: DEFAULT_SCHEMA }
    );
    const pet = {
      name: "Django",
      id: 123,
    };
    const result = validator
      .isPayloadValid({
        model: "Pet",
        payload: pet,
        schema: "examples/petstore_aws.yaml",
      })
      .then((data) => {
        expect(data).toEqual([]);
        done();
      });
  });

  test("An object should not match the schema", (done) => {
    const pet = {
      name: "Django",
      id: 123,
      age: 1,
    };
    const result = validator
      .isPayloadValid({
        model: "Pets",
        payload: pet,
        schema: "examples/petstore_aws.yaml",
      })
      .catch((data) => {
        expect(data).toEqual([
          {
            instancePath: "",
            schemaPath: "#/type",
            keyword: "type",
            params: { type: "array" },
            message: "must be array",
          },
        ]);
        done();
      });
  });
});
