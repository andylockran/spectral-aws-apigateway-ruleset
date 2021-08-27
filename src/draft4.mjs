import Ajv from "ajv-draft-04"
import addFormats from "ajv-formats"
const yaml = require('js-yaml');
const fs   = require('fs');


const ajv = new Ajv({
    "strict": true,
});
addFormats(ajv, ["date-time","email","hostname","ipv4","ipv6","uri"])
    
ajv.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

// function validate_json() {
    
// };

module.exports = (targetVal, _opts, context) => {
    let openapi = targetVal
    const results = []

    const schemaList = openapi.components.schemas
    for (const property in schemaList) {
        if (Object.prototype.hasOwnProperty.call(schemaList, property)) {
            const schema_model = schemaList[property]
            schema_model.id = `#/components/schemas/${property}`
            try {
                let schema = schemaList[property]
                ajv.addSchema(schema)
            }
            catch (error) {
                console.log(`${property} failed to add due to ${error}`)
            }
            
        }
    }
    for (const property in schemaList) {
        try {
            ajv.compile(schemaList[property])
        }
        catch (error) {
            results.push({
                "message": `${error}`,
                "path": ['components', 'schemas', property]
            })
        }
    }
    return results
}