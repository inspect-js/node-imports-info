'use strict';

var test = require('tape');

var getCategoryInfo = require('../getCategoryInfo');
var getCategoryFlags = require('../getCategoryFlags');
var getConditionsForCategory = require('../getConditionsForCategory');

test('getCategoryInfo', function (t) {
	t.deepEqual(
		getCategoryInfo('pattern-trailers'),
		{
			conditions: getConditionsForCategory('pattern-trailers', 'require'),
			flags: getCategoryFlags('pattern-trailers')
		},
		'combines require-mode conditions and flags by default'
	);

	t.deepEqual(
		getCategoryInfo('pattern-trailers', 'import'),
		{
			conditions: getConditionsForCategory('pattern-trailers', 'import'),
			flags: getCategoryFlags('pattern-trailers')
		},
		'passes the moduleSystem through to the conditions'
	);

	t.deepEqual(
		getCategoryInfo('pre-imports'),
		{ conditions: null, flags: getCategoryFlags('pre-imports') },
		'a category without the imports field yields null conditions'
	);

	t.end();
});
