'use strict';

/** @type {import('./ranges.d.ts')} */
module.exports = {
	__proto__: null,
	'^24.14 || >= 25.4': 'subpath-imports-slash', // `#/` allowed in 25.4, backported to 24.14
	'^20.19 || 22.12 - 24.13 || 25 - 25.3': 'pattern-trailers-no-dir-slash+module-sync', // module-sync added in 20.19/22.12
	'17 - 20.18 || ^21 || 22.0 - 22.11': 'pattern-trailers-no-dir-slash', // folder mappings removed in 17.0
	'^14.19 || 16.10 - 16': 'pattern-trailers', // pattern trailers added in 14.19, 16.10
	'^12.20 || 14.13 - 14.18 || 15.x || 16.0 - 16.9': 'patterns', // `*` patterns added in 12.20, 14.13
	'~12.19 || 14.6 - 14.12': 'imports', // `imports` field added in 14.6, backported to 12.19
	'< 12.19 || 13 - 14.5': 'pre-imports'
};
