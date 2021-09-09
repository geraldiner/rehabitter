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
			res.render("./error/500");
		}
	},
};
