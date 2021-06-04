import Ajv from "ajv-draft-04"


const ajvValidator = new Ajv();
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