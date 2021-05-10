const Ajv = require("ajv")
const draft4MetaSchema = require("ajv/lib/refs/json-schema-draft-04.json")


const ajv = new Ajv({
    schemaId: "id",
    strict: true,
    strictKeywords: true,
    strictDefaults: true
    });
ajv.addMetaSchema(draft4MetaSchema)
ajv.addKeyword("example"); // Added 'example' keyword as other rules pick up on this.

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