import Ajv from "ajv-draft-04"
import addFormats from "ajv-formats"

const ajv = new Ajv({
    "strict": true,
});
addFormats(ajv, ["date-time","email","hostname","ipv4","ipv6","uri"])
    
ajv.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

// function validate_json() {
    
// };

module.exports = targetVal => {
    try {
        const schemaList = targetVal.components.schemas
        for (const property in schemaList) {
            if (Object.prototype.hasOwnProperty.call(schemaList, property)) {
                const schema_model = schemaList[property]
                schema_model.id = `https://example.com/schema.json#/components/schemas/${property}`
                ajv.addSchema(schemaList[property])
            }
        }
        for (const schema in schemaList) {
            let test = ajv.compile(schemaList[schema])
        }
    }
    catch (error) {
        return [ 
            { 
                message: `Invalid schema: ${error}`,
            }
        ]
    }
}