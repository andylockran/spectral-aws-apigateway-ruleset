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

    itif(true)("The petstore in the examples folder is a valid document", done => {
        spectral.run(petstore)
            .then(results => {
                expect(results).toEqual([]);
                done();
            });
    });

    itif(true)("The supported in the examples folder is a valid document", done => {
        spectral.run(supported)
            .then(results => {
                expect(results).toEqual([]);
                done();
            });
    });

    it("should throw error if path segment bad.", done => {
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
});