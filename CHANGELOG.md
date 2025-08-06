# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-08-06

## Add

- Updated to esm module to simplify folder structure

## Remove

- Deprecated node16
- Deprecated node18
- Removed esbuild

## [1.0.6] - 2021-06-04

### Removed

- aws-min-items, it is supported by OpenAPI3 in API Gateway
- aws-max-items, it is supported by OpenAPI3 in API Gateway

## [1.0.5] - 2021-06-04

### Add
- downgraded additionalProperties to a hint, as is supported by API Gateway.
- Upgraded to ajv 8.5.0 to take advantage of the new ajv-draft-04 library
- Added ajv-formats to allow the subset of formats available in draft-04, as published https://datatracker.ietf.org/doc/html/draft-fge-json-schema-validation-00#section-7.2

## [1.0.1] - 2021-05-10

- added draft-4 schema checking rule & function
### Add

- added a draft-4 schema checker, which qualifies for a major version bump as this is a good, but blocking rule.

## [0.0.4] - 2021-05-07

### Fixed

- modified aws-default rule to rescope it to just the model definition, as the rule was previously scoped to the whole document, and picked up a false positive under $.servers
