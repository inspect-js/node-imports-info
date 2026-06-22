'use strict';

var makeGetCategoryFlags = require('node-package-field-info/makeGetCategoryFlags');

var isCategory = require('./isCategory');

/** @import { Category } from './types' */

// Categories that support patterns (wildcard *)
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var patternsCategories = {
	__proto__: null,
	patterns: true,
	'pattern-trailers': true,
	'pattern-trailers-no-dir-slash': true,
	'pattern-trailers-no-dir-slash+module-sync': true,
	'subpath-imports-slash': true
};

// Categories that support pattern trailers (suffix after *)
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var patternTrailersCategories = {
	__proto__: null,
	'pattern-trailers': true,
	'pattern-trailers-no-dir-slash': true,
	'pattern-trailers-no-dir-slash+module-sync': true,
	'subpath-imports-slash': true
};

// Categories that support directory slash imports (ending with /)
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var dirSlashCategories = {
	__proto__: null,
	imports: true,
	patterns: true,
	'pattern-trailers': true
};

// Categories that support subpath imports starting with `#/`
/** @type {{ [k in Category | '__proto__']?: k extends '__proto__' ? null : true }} */
var subpathSlashCategories = {
	__proto__: null,
	'subpath-imports-slash': true
};

/** @type {import('./getCategoryFlags')} */
module.exports = makeGetCategoryFlags(isCategory, {
	patterns: patternsCategories,
	patternTrailers: patternTrailersCategories,
	dirSlash: dirSlashCategories,
	subpathSlash: subpathSlashCategories
});
