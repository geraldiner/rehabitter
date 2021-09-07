module.exports = {
	getIndex: (req, res) => {
		if (req.user) {
			return res.redirect("/dashboard");
		}
		const locals = {
			title: "",
			layout: "../views/layouts/landing.ejs",
		};
		res.render("../views/index.ejs", locals);
	},
};
