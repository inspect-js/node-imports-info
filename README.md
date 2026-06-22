# node-imports-info <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Info about node `imports` field support: version ranges, categories, etc.

The `imports` field (subpath imports, with specifiers prefixed by `#`) shares most of its resolution behavior with the `exports` field, but its features arrived on a different timeline. This package tracks `imports`-specific syntax support; for `exports`, see [`node-exports-info`](https://www.npmjs.com/package/node-exports-info).

`imports` resolution also uses conditions (`node`, `node-addons`, `require`, `import`, `module-sync`, `default`); these are field-agnostic, so `getConditionsForCategory`/`getCategoryInfo` share their implementation (in [`node-package-field-info`](https://www.npmjs.com/package/node-package-field-info)) with [`node-exports-info`](https://www.npmjs.com/package/node-exports-info).

## Categories
 - `pre-imports`: versions that do not support the `imports` field (`< 12.19 || 13 - 14.5`). The field was added in 14.6.0 and backported to 12.19.0, so the 13.x line and 14.0 - 14.5 never received it, despite being newer than 12.19
 - `imports`: the first versions to support the `imports` field, including conditions and trailing-slash folder mappings, but not `*` patterns (`~12.19 || 14.6 - 14.12`)
 - `patterns`: support for `*` subpath patterns was added in these versions (`^12.20 || 14.13 - 14.18 || 15.x || 16.0 - 16.9`)
 - `pattern-trailers`: support for “pattern trailers” (a suffix after the `*`) was added in these versions (`^14.19 || 16.10 - 16`)
 - `pattern-trailers-no-dir-slash`: support for trailing-slash folder mappings (ending in `/`) was removed for these versions (`17 - 20.18 || ^21 || 22.0 - 22.11`)
 - `pattern-trailers-no-dir-slash+module-sync`: same syntax support, but the `module-sync` condition was added in these versions (`^20.19 || 22.12 - 24.13 || 25 - 25.3`)
 - `subpath-imports-slash`: these versions support subpath imports keys starting with `#/`, e.g. `"#/*": "./src/*.js"` (`^24.14 || >= 25.4`)

## Entry points
 - `node-imports-info/getCategoriesForRange`: takes a node semver version range; returns an array of categories that overlap it
 - `node-imports-info/getCategory`: takes an optional node semver version (defaults to the current node version); returns the latest category that matches it
 - `node-imports-info/getCategoryFlags`: takes a category; returns an object with boolean flags `{ patterns, patternTrailers, dirSlash, subpathSlash }` indicating which `imports` features are supported
 - `node-imports-info/getConditionsForCategory`: takes a category and an optional `moduleSystem` (`'require'` or `'import'`); returns the array of supported conditions, or `null` if the `imports` field is unsupported
 - `node-imports-info/getCategoryInfo`: takes a category and an optional `moduleSystem`; returns an object with `conditions` and `flags`
 - `node-imports-info/getRange`: takes a category; returns the node semver version range that matches it
 - `node-imports-info/getRangePairs`: returns an array of entries - each a tuple of “semver range” and “category”
 - `node-imports-info/isCategory`: takes a category; returns true if it’s a known category

## Related packages
 - [`node-exports-info`](https://www.npmjs.com/package/node-exports-info): the same, for the `exports` field
 - [`has-package-imports`](https://www.npmjs.com/package/has-package-imports): feature-detect your node version’s `imports` support

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/node-imports-info
[npm-version-svg]: https://versionbadg.es/inspect-js/node-imports-info.svg
[npm-badge-png]: https://nodei.co/npm/node-imports-info.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/node-imports-info.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/node-imports-info.svg
[downloads-url]: https://npm-stat.com/charts.html?package=node-imports-info
[codecov-image]: https://codecov.io/gh/inspect-js/node-imports-info/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/inspect-js/node-imports-info/
[actions-image]: https://img.shields.io/github/check-runs/inspect-js/node-imports-info/main
[actions-url]: https://github.com/inspect-js/node-imports-info/actions
