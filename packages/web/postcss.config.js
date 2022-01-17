const __prod__ = process.env.NODE_ENV === 'production';

const plugins = {
	autoprefixer: {},
	'@fullhuman/postcss-purgecss': {
		content: ['./**/*.html', './**/*.tsx', './**/*.ts'],
		safelist: ['img', 'html', 'body', 'svg', 'ul', 'ol'],
	},
};

module.exports = {
	plugins: __prod__
		? plugins
		: {
				autoprefixer: {},
		  },
};
