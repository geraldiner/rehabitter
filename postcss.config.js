const cssnano = require("cssnano");
module.exports = {
	plugins: [
		require("postcss-import"),
		cssnano({ preset: "default" }),
		require("tailwindcss/nesting")(require("postcss-nesting")),
		require("tailwindcss"),
		require("autoprefixer"),
	],
};
