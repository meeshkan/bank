// babel.config.js
module.exports = {
	plugins: ['@babel/plugin-transform-react-jsx'],
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
};
