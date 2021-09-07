module.exports = {
	getIndex: (req, res) => {
		const locals = {
			title: "",
			layout: "../views/layouts/landing.ejs",
		};
		res.render("../views/index.ejs", locals);
	},
};
