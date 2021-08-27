import draft4 from "../draft4";
const yaml = require('js-yaml');
const fs   = require('fs')
describe("JSONSchema Compile All", () => {
    test("A schema should compile across all $refs", () => {
      const input = yaml.load(fs.readFileSync('examples/petstore_aws.yaml', 'utf8'));
      const output = undefined;
      expect(draft4(input)).toEqual(output);
    })
})