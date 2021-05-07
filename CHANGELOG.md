# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.4] - 2021-05-07

### Fixed

- modified aws-default rule to rescope it to just the model definition, as the rule was previously scoped to the whole document, and picked up a false positive under $.servers