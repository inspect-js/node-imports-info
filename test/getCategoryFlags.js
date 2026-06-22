'use strict';

var test = require('tape');
var forEach = require('for-each');

var getCategoryFlags = require('../getCategoryFlags');
var getRangePairs = require('../getRangePairs');

test('getCategoryFlags', function (t) {
	t['throws'](
		// @ts-expect-error
		function () { getCategoryFlags('not a category'); },
		RangeError,
		'invalid category throws'
	);

	forEach(getRangePairs(), function (pair) {
		var category = pair[1];
		t.test('category: ' + category, function (st) {
			var flags = getCategoryFlags(category);

			st.ok(
				flags && typeof flags === 'object',
				'returns an object'
			);
			st.ok(
				'patterns' in flags && typeof flags.patterns === 'boolean',
				'has boolean patterns flag'
			);
			st.ok(
				'patternTrailers' in flags && typeof flags.patternTrailers === 'boolean',
				'has boolean patternTrailers flag'
			);
			st.ok(
				'dirSlash' in flags && typeof flags.dirSlash === 'boolean',
				'has boolean dirSlash flag'
			);
			st.ok(
				'subpathSlash' in flags && typeof flags.subpathSlash === 'boolean',
				'has boolean subpathSlash flag'
			);

			if (flags.patternTrailers) {
				st.ok(flags.patterns, 'patternTrailers implies patterns');
			}

			if (flags.subpathSlash) {
				st.ok(flags.patternTrailers, 'subpathSlash implies patternTrailers');
			}

			st.end();
		});
	});

	t.test('specific category flags', function (st) {
		st.deepEqual(
			getCategoryFlags('pre-imports'),
			{ patterns: false, patternTrailers: false, dirSlash: false, subpathSlash: false },
			'pre-imports has no flags'
		);

		st.deepEqual(
			getCategoryFlags('imports'),
			{ patterns: false, patternTrailers: false, dirSlash: true, subpathSlash: false },
			'imports supports directory-slash folder mappings but not patterns'
		);

		st.deepEqual(
			getCategoryFlags('patterns'),
			{ patterns: true, patternTrailers: false, dirSlash: true, subpathSlash: false },
			'patterns has patterns and dirSlash'
		);

		st.deepEqual(
			getCategoryFlags('pattern-trailers'),
			{ patterns: true, patternTrailers: true, dirSlash: true, subpathSlash: false },
			'pattern-trailers has patterns, patternTrailers, and dirSlash'
		);

		st.deepEqual(
			getCategoryFlags('pattern-trailers-no-dir-slash'),
			{ patterns: true, patternTrailers: true, dirSlash: false, subpathSlash: false },
			'pattern-trailers-no-dir-slash has patterns and patternTrailers but not dirSlash'
		);

		st.deepEqual(
			getCategoryFlags('pattern-trailers-no-dir-slash+module-sync'),
			{ patterns: true, patternTrailers: true, dirSlash: false, subpathSlash: false },
			'pattern-trailers-no-dir-slash+module-sync has the same flags (it differs only in conditions)'
		);

		st.deepEqual(
			getCategoryFlags('subpath-imports-slash'),
			{ patterns: true, patternTrailers: true, dirSlash: false, subpathSlash: true },
			'subpath-imports-slash has patterns, patternTrailers, and subpathSlash but not dirSlash'
		);

		st.end();
	});

	t.end();
});
