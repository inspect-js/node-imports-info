'use strict';

var test = require('tape');
var forEach = require('for-each');

var getConditionsForCategory = require('../getConditionsForCategory');
var getRangePairs = require('../getRangePairs');

test('getConditionsForCategory', function (t) {
	t['throws'](
		// @ts-expect-error
		function () { getConditionsForCategory('not a category'); },
		RangeError,
		'invalid category throws'
	);

	forEach(getRangePairs(), function (pair) {
		var category = pair[1];
		t.test('category: ' + category, function (st) {
			if (category === 'pre-imports') {
				st.equal(
					getConditionsForCategory(category),
					null,
					'a category without the imports field yields null'
				);
			} else {
				st.ok(Array.isArray(getConditionsForCategory(category)), 'moduleSystem none: returns an array');
				st.ok(Array.isArray(getConditionsForCategory(category, 'require')), 'moduleSystem require: returns an array');
				st.ok(Array.isArray(getConditionsForCategory(category, 'import')), 'moduleSystem import: returns an array');

				st['throws'](
					// @ts-expect-error
					function () { getConditionsForCategory(category, 'not a thing'); },
					TypeError,
					'invalid moduleSystem throws'
				);
			}

			st.end();
		});
	});

	t.deepEqual(
		getConditionsForCategory('imports'),
		['import', 'node', 'require', 'default'],
		'`imports` has the base conditions'
	);
	t.deepEqual(
		getConditionsForCategory('pattern-trailers'),
		['import', 'node-addons', 'node', 'require', 'default'],
		'`pattern-trailers` adds the `node-addons` condition'
	);
	t.deepEqual(
		getConditionsForCategory('pattern-trailers-no-dir-slash+module-sync'),
		['import', 'node-addons', 'node', 'require', 'module-sync', 'default'],
		'`pattern-trailers-no-dir-slash+module-sync` adds both `node-addons` and `module-sync`'
	);

	t.end();
});
