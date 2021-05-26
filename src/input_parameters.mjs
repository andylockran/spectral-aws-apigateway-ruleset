import ajv, { ErrorObject } from 'ajv';
import draft4MetaSchema from "ajv/lib/refs/json-schema-draft-04.json"
import input_parameters from "./input_parameters.json"

const ajvValidator = ajv({
    schemaId: "auto",
    strict: true,
    strictKeywords: true,
    strictDefaults: true
    });
ajvValidator.addMetaSchema(draft4MetaSchema)
ajvValidator.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

module.exports = targetVal => {
    let validate = ajvValidator.compile(input_parameters)
    let valid = validate(targetVal)
    if (!valid) {
        let response = [];
        validate.errors.forEach(error => {
            response.push({
                message: `${JSON.stringify(error)}`,
                }
            )
        })
        return response;
    }
}