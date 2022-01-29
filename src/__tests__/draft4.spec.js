import { doesNotMatch } from "assert";
import draft4 from "../draft4";
const yaml = require('js-yaml');
const fs   = require('fs')
const AMV = require('apigw-model-validator')

const validator = new AMV()

describe("JSONSchema Compile All", () => {
    test("A schema should compile across all $refs", () => {
      const input = yaml.load(fs.readFileSync('examples/petstore_aws.yaml', 'utf8'), {schema: yaml.DEFAULT_SCHEMA});
      const output = [];
      expect(draft4(input)).toEqual(output);
    })

    test("An object should match the schema", (done) => {
      const input = yaml.load(fs.readFileSync('examples/petstore_aws.yaml', 'utf8'), {schema: yaml.DEFAULT_SCHEMA});
      const pet = {
        'name': 'Django',
        'id': 123
      }
      const result = validator.isPayloadValid({
        model: 'Pet',
        payload: pet,
        schema: 'examples/petstore_aws.yaml'
      }).then(data => {
        expect(data).toEqual([])
        done()
      })
    })
  
    test("An object should not match the schema", (done) => {
      const pet = {
        'name': 'Django',
        'id': 123,
        'age': 1
      }
      const result = validator.isPayloadValid({
        model: 'Pets',
        payload: pet,
        schema: 'examples/petstore_aws.yaml'
      }).catch(data => {
        expect(data).toEqual([
          {
            instancePath: '',
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'array' },
            message: 'must be array'
          }
        ])
        done()
      })
    })})