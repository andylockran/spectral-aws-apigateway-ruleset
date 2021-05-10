const Ajv = require("ajv")
const draft4MetaSchema = require("ajv/lib/refs/json-schema-draft-04.json")


const ajv = new Ajv({
    schemaId: "auto",
    strict: true,
    strictKeywords: true,
    strictDefaults: true
    });
ajv.addMetaSchema(draft4MetaSchema)
ajv.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

module.exports = (targetVal) => {
    try {
        ajv.compile(targetVal);
    }
    catch (error) {
        return [ 
            { 
                message: `Not valid JSONSchema4: ${error}`,
            }
        ]
    }
};