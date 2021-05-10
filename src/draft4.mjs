import ajv, { ErrorObject } from 'ajv';
import * as draft4MetaSchema from "ajv/lib/refs/json-schema-draft-04.json"

const ajvValidator = ajv({
    schemaId: "auto",
    strict: true,
    strictKeywords: true,
    strictDefaults: true
    });
ajvValidator.addMetaSchema(draft4MetaSchema)
ajvValidator.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

// function validate_json() {
    
// };

module.exports = targetVal => {
    try {
        ajvValidator.compile(targetVal);
    }
    catch (error) {
        return [ 
            { 
                message: `Not valid JSONSchema4: ${error}`,
            }
        ]
    }
}