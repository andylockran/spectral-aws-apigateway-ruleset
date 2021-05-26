const { Spectral, isOpenApiv2, isOpenApiv3 } = require('@stoplight/spectral');
const { join } = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
const petstore = fs.readFileSync(join(__dirname, "../../examples/petstore_aws.yaml"), { encoding: "utf-8" });
const supported = fs.readFileSync(join(__dirname, "../../examples/petstore_aws_support.yml"), { encoding: "utf-8" });
const itif = (isOpenApiv3) => isOpenApiv3 ? it : it.skip;

const spectral = new Spectral();
spectral.registerFormat('oas2', isOpenApiv2);
spectral.registerFormat('oas3', isOpenApiv3);

describe("AWS Important Notes", () => {

    beforeAll(done => {
        spectral.loadRuleset(join(__dirname, "../../aws_important_notes.yml"))
            .then(() => done());
    })

    it("The petstore example in the examples folder is a valid document", done => {
        spectral.run(petstore)
            .then(results => {
                expect(results).toEqual([]);
                done();
            });
    });

    it("should throw error if path segment invalid.", done => {
        /*
        Path segments can only contain alphanumeric characters, hyphens, periods, commas, and curly braces.
        Path parameters must be separate path segments.
        For example,
            "resource/{path_parameter_name}" is valid;
            "resource{path_parameter_name}" is not. 
        */
        let input = yaml.load(petstore);
        
        // create a new invalid path with a duplicate definition to /pets
        input.paths['/pets{path_parameter_name}'] = input.paths['/pets']
        spectral.run(input)
            .then(results => {
                expect(results[0].code).toEqual('aws-path-segments')
                done();
            });
    })
    it("should throw an error if a Model name is not alpha numeric", done => {
        /*
        Model names can only contain alphanumeric characters.
        */
        let input = yaml.load(petstore);
        input.components.schemas['Err0r_Schema!'] = input.components.schemas['Pet']
        spectral.run(input)
            .then(results => {
                expect(results[0].code).toEqual('aws-model-names');
                done();
            });

    });
    
    it("should validate input parameters", done => {
        /*

        This appears to vary based on the definition being Swagger or OpenAPIv3.
        It also allows the 'schema' property, and doesn't ignore it, because it's
        not an attribute.?  Need to work out how to codify that.

        For input parameters, only the following attributes are supported:
        - name, 
        - in, 
        - required,
        - type,
        - description.
        Other attributes are ignored. 

        ** Addendum **

        But if in is "body":
            - schema is Required. 

            If in is any value other than "body":
            - type is Required. 
            - if type is "array".	
                - items is Required.
        */
        let input = yaml.load(petstore);
        input.paths['/pets'].post
        spectral.run(input)
            .then(results => {
                expect(results).toEqual([]);
                done();
            });
    })
});