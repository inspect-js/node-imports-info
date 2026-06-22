declare const ranges: {
	__proto__: null;
	'^24.14 || >= 25.4': 'subpath-imports-slash';
	'17 - 24.13 || 25 - 25.3': 'pattern-trailers-no-dir-slash';
	'^14.19 || 16.10 - 16': 'pattern-trailers';
	'^12.20 || 14.13 - 14.18 || 15.x || 16.0 - 16.9': 'patterns';
	'~12.19 || 14.6 - 14.12': 'imports';
	'< 12.19 || 13 - 14.5': 'pre-imports';
};

export = ranges;
