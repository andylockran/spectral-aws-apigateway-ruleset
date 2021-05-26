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
    it("If body and schema present, then it shouldn't throw an error.", () => {
        const input = {
            "name": "id",
            "in": "body",
            "description": "The ID of the requested test",
            "schema": {}
          }
        const output = undefined;
        expect(input_parameters(input)).toEqual(output);
    })
    it("If body is present, and schema is missing, then it should throw an error", () => {
      const input = {
          "name": "id",
          "in": "body",
          "description": "The ID of the requested test"
        }
      const output = [{"message": "{\"keyword\":\"required\",\"dataPath\":\"\",\"schemaPath\":\"#/allOf/1/then/required\",\"params\":{\"missingProperty\":\".schema\"},\"message\":\"should have required property '.schema'\"}"}]
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
    it("If type is array, then items should be present, else an error should be thrown.", () => {
      const input = {
          "name": "id",
          "in": "path",
          "description": "The ID of the requested test",
          "type":  "array"
        }
      const output = [{"message": "{\"keyword\":\"required\",\"dataPath\":\"\",\"schemaPath\":\"#/allOf/0/then/required\",\"params\":{\"missingProperty\":\".items\"},\"message\":\"should have required property '.items'\"}"}]
      expect(input_parameters(input)).toEqual(output);
    })
    it("If type is array, then items should be present.", () => {
      const input = {
          "name": "id",
          "in": "path",
          "description": "The ID of the requested test",
          "type":  "array",
          "items": {}
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