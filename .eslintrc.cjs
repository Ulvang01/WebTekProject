module.exports = {
	root: true,
	parser: 'esprima',
	extends: ['eslint:recommended', 'prettier'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
