'use strict';

var test = require('tape');
var forEach = require('for-each');
var semver = require('semver');

var getRangePairs = require('../getRangePairs');
var isCategory = require('../isCategory');

test('getRangePairs', function (t) {
	var pairs = getRangePairs();
	t.ok(Array.isArray(pairs), 'returns an array');

	forEach(pairs, function (entry, i) {
		t.ok(Array.isArray(entry), 'entry ' + i + ' is an array');

		var range = entry[0];
		var category = entry[1];

		t.ok(semver.validRange(range), i + ': item 0 is a valid semver range');
		t.equal(isCategory(category), true, i + ': item 1 is a valid category');
	});

	t.end();
});
