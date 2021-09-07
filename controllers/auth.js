const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

module.exports = {
	getLogin: (req, res) => {
		if (req.user) {
			return res.redirect("/dashboard");
		} else {
			const locals = {
				title: "login",
				layout: "../views/layouts/form.ejs",
			};
			res.render("../views/login.ejs", locals);
		}
	},
};
