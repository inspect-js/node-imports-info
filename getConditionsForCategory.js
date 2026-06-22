'use strict';

var makeGetConditionsForCategory = require('node-package-field-info/makeGetConditionsForCategory');

var isCategory = require('./isCategory');

/** @import { Category } from './types' */

// categories that support the node-addons condition (added in v14.19/v16.10)
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var nodeAddonsCategories = {
	__proto__: null,
	'pattern-trailers': true,
	'pattern-trailers-no-dir-slash': true,
	'pattern-trailers-no-dir-slash+module-sync': true,
	'subpath-imports-slash': true
};

// categories that support the module-sync condition (added in v20.19/v22.12)
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var moduleSyncCategories = {
	__proto__: null,
	'pattern-trailers-no-dir-slash+module-sync': true,
	'subpath-imports-slash': true
};

// categories that do not support the `imports` field at all
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var nullCategories = {
	__proto__: null,
	'pre-imports': true
};

// categories that only support the `default` condition
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var defaultOnlyCategories = {
	__proto__: null
};

/** @type {import('./getConditionsForCategory')} */
module.exports = makeGetConditionsForCategory(isCategory, {
	addonsCategories: nodeAddonsCategories,
	moduleSyncCategories: moduleSyncCategories,
	nullCategories: nullCategories,
	defaultOnlyCategories: defaultOnlyCategories
});
