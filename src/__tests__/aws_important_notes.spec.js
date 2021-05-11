const { Spectral } = require("@stoplight/spectral");
const ruleset = require("../aws_important_notes.yml")

const spectral = new Spectral();
spectral.setRuleset(ruleset);

describe("AWS Important Notes", () => {
    test("The example in the examples folder is a valid document", () => {

    })  ;  
    test("For input parameters, only the following attributes are supported.", () => {

    })
});