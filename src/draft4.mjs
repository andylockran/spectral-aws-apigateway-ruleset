import Ajv from "ajv-draft-04"
import addFormats from "ajv-formats"

const ajv = new Ajv({
    "strict": true,
});
addFormats(ajv, ["date-time","email","hostname","ipv4","ipv6","uri"])
    
ajv.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

// function validate_json() {
    
// };

module.exports = (targetVal, _opts, context) => {
    let openapi = JSON.parse(JSON.stringify(targetVal))
    const results = []

    const schemaList = openapi.components.schemas
    for (const property in schemaList) {
        if (Object.prototype.hasOwnProperty.call(schemaList, property)) {
            const schema_model = schemaList[property]
            schema_model.id = `#/components/schemas/${property}`
            ajv.addSchema(schemaList[property])
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