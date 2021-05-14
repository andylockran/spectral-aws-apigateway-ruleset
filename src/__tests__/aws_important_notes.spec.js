const { Spectral, isOpenApiv2, isOpenApiv3 } = require('@stoplight/spectral');
const { join } = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
const petstore = fs.readFileSync(join(__dirname, "../../examples/petstore_aws.yaml"), { encoding: "utf-8"});

const spectral = new Spectral();
spectral.registerFormat('oas2', isOpenApiv2);
spectral.registerFormat('oas3', isOpenApiv3);

describe("AWS Important Notes", () => {
    test("The example in the examples folder is a valid document", () => {
        const input = petstore;
        spectral
        .loadRuleset(join(__dirname, "../../aws_important_notes.yml"))
        .then(() => spectral.run(input))
        .then(results => {
            expect(results).toEqual([]);
        });
    });  
    test("For input parameters, only the following attributes are supported.", () => {

    })
});