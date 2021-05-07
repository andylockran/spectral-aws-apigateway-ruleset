# Spectral AWS API Gateway Ruleset

When working with AWS API Gateway, it uses a number of features that are a step away from the OpenAPI standard.

Usefully, the features are documented here [AWS API Gateway Important Notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html), but
it's very easy for API developers to forget, or miss them.

## Spectral

[Spectral](https://stoplight.io/open-source/spectral/) is an Open Source API Linter.

Spectral is an open source JSON/YAML linter, which allows you to create style guides for your structured data; things like OpenAPI/AsyncAPI/RAML descriptions, Kubernetes config, GitHub Actions, you name it, Spectral can help you lint it. Go beyond making sure they are “Technically Correct”, make sure they are useful.

## Instructions

To use this ruleset, simply extend your .spectral.yml ruleset by adding a reference to this ruleset, eg:

```
extends: 
  - spectral:oas
  - spectral-aws-apigateway-ruleset
```

See: [Spectral Instructions for npm](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md#npm) for more details.

## Contributing

The severity of each of these rules has been tweaked to follow my own usage.  If you think the severity needs changing, or would prefer a more descriptive error message, please submit a PR.

