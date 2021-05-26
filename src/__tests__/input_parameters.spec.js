import input_parameters from "../input_parameters.mjs";

describe("This should validate the input_parameters_objects", () => {
    it("A set of input_parameters should validate", () => {
        const input = {
            "name": "id",
            "in": "body",
            "description": "The ID of the requested test",
            "schema": {}
          }
        const output = undefined;
        expect(input_parameters(input)).toEqual(output);
    })
    it("If body, then schema is required", () => {
        const input = {
            "name": "id",
            "in": "body",
            "description": "The ID of the requested test",
            "schema": {
              "type": "string",
              "pattern": "^[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}$"
            }
          }
        const output = undefined;
        expect(input_parameters(input)).toEqual(output);
    })
    it("If not body, then schema is not required", () => {
        const input = {
            "name": "id",
            "in": "path",
            "description": "The ID of the requested test",
            "type":  "string"
          }
        const output = undefined;
        expect(input_parameters(input)).toEqual(output);
    })
    it("Should not allow additional properties", () => {
        const input = {
            "name": "id",
            "in": "path",
            "smelly": "feet",
            "description": "The ID of the requested test",
            "type":  "string"
          }
        const output = [{"message": "{\"keyword\":\"additionalProperties\",\"dataPath\":\"\",\"schemaPath\":\"#/additionalProperties\",\"params\":{\"additionalProperty\":\"smelly\"},\"message\":\"should NOT have additional properties\"}"}];
        expect(input_parameters(input)).toEqual(output);
    })
})