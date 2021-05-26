
var Ajv = require('ajv');
let input_parameters = require("./input_parameters.json")

const input = {
    "name": "id",
    "in": "path",
    "description": "The ID of the requested test",
    "smelly": "body",
    "required": true,
    "schema": {
      "type": "string",
      "pattern": "^[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}\\-[0-9A-Z]{4}$"
    }
  }


var ajv = new Ajv({
  schemaId: "auto",
    strict: true,
    strictKeywords: true,
    strictDefaults: true
});

ajv.addKeyword("example")

//ajvValidator.addMetaSchema(draft4MetaSchema)
//ajvValidator.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.
var validate = ajv.compile(input_parameters);
var valid = validate(input);
if (!valid) {
  console.log(validate.errors);
}
//let valid = ajvValidator.validate(input_parameters, input)
//console.log({valid})