# Spectral AWS API Gateway Ruleset

When working with AWS API Gateway, it uses a number of features that are a step away from the OpenAPI standard.

Usefully, the features are documented here [AWS API Gateway Important Notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html), but
it's very easy for API developers to forget, or miss them.

## Spectral

[Spectral](https://stoplight.io/open-source/spectral/) is an Open Source API Linter.

Spectral is an open source JSON/YAML linter, which allows you to create style guides for your structured data; things like OpenAPI/AsyncAPI/RAML descriptions, Kubernetes config, GitHub Actions, you name it, Spectral can help you lint it. Go beyond making sure they are “Technically Correct”, make sure they are useful.

Try it out:

If you've got npx installed, then you can run this ruleset with a single command, replacing $your_api.yml - with your API definition:

`npx spectral lint -r https://raw.githubusercontent.com/andylockran/spectral-aws-apigateway-ruleset/main/aws_important_notes.yml $your_api.yaml`

## Instructions

To use this ruleset, simply extend your .spectral.yml ruleset by adding a reference to this ruleset, eg:

```
extends: 
  - spectral:oas
  - spectral-aws-apigateway-ruleset
```

This pulls the definition directly from npm, do you don't have to even install it!

## NPM package

[spectral-aws-apigateway-ruleset](https://www.npmjs.com/package/spectral-aws-apigateway-ruleset)

See: [Spectral Instructions for npm](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md#npm) for more details.

## Contributing

The severity of each of these rules has been tweaked to follow my own usage.  If you think the severity needs changing, or would prefer a more descriptive error message, please submit a PR.

For instructions on how to do so, refer to [Custom Rulesets](https://meta.stoplight.io/docs/spectral/docs/guides/4-custom-rulesets.md) on the Spectral site.

