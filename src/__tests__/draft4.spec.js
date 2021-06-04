import draft4 from "../draft4";
// https://datatracker.ietf.org/doc/html/draft-fge-json-schema-validation-00#section-4.1
// Including additional formats as described above ^^
describe("JSONSchema Draft-4", () => {
  test("A valid JSON Schema should pass with no errors", () => {
    const input = {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "petType": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "petType"
      ]
    }
    const output = undefined;
    expect(draft4(input)).toEqual(output);
  });

  test("An invalid JSON Schema should fail with an error", () => {
    const input = {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "format": "string"
        },
        "petType": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "petType"
      ]
    }
    const output = [
      {
        message: 'Not valid JSONSchema4: Error: unknown format "string" ignored in schema at path "#/properties/name"'
      }
    ];
    expect(draft4(input)).toEqual(output);
  });

  test("format date isn't valid in draft-4", () => {
    const input = {
      "type": "object",
      "properties": {
        "isadate": {
          "type": "string",
          "format": "date"
        }
      }
    }
    const output = [{"message": "Not valid JSONSchema4: Error: unknown format \"date\" ignored in schema at path \"#/properties/isadate\""}];
    expect(draft4(input)).toEqual(output);
  });

  test("format date-time is valid in draft-4", () => {
    const input = {
      "type": "object",
      "properties": {
        "isadate": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
    const output = undefined;
    expect(draft4(input)).toEqual(output);
  });
});