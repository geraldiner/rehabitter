const Habit = require("../models/Habit");
module.exports = {
	getDashboard: async (req, res) => {
		try {
			const habits = await Habit.find({ user: req.user.id }).lean();
			const locals = {
				title: "Dashboard",
				layout: "../views/layouts/main",
				user: req.user,
				habits: habits,
			};
			res.render("../views/dashboard.ejs", locals);
		} catch (error) {
			console.error(error);
		}
	},
	addHabit: (req, res) => {
		const locals = {
			title: "Add New Habit",
			layout: "./layouts/form",
			user: req.user,
		};
		res.render("../views/habits/add.ejs", locals);
	},
	postHabit: async (req, res) => {
		try {
			req.body.user = req.user.id;
			await Habit.create(req.body);
			res.redirect("/dashboard");
		} catch {
			console.error(error);
		}
	},
};
