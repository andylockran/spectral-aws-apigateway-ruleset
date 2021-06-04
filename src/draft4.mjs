import Ajv from "ajv-draft-04"
import addFormats from "ajv-formats"

const ajv = new Ajv();
addFormats(ajv, ["date-time","email","hostname","ipv4","ipv6","uri"])
    
ajv.addKeyword("example"); // Added 'example' keyword as picked up by `aws-example-tag` rule.

// function validate_json() {
    
// };

module.exports = targetVal => {
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
}