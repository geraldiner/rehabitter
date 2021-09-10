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
	editHabit: async (req, res) => {
		try {
			const habit = await Habit.findOne({
				_id: req.params.id,
			}).lean();

			if (!habit) {
				return res.render("error/404", { title: "404 Error", layout: "./layouts/main", user: req.user });
			}
			if (habit.user != req.user.id) {
				res.redirect("/dashboard");
			} else {
				res.render("habits/edit", { title: "Edit Habit", layout: "./layouts/form", habit: habit, user: req.user });
			}
		} catch {
			console.error(error);
		}
	},
	postEdit: async (req, res) => {
		try {
			let habit = await Habit.findById(req.params.id).lean();

			if (!habit) {
				return res.render("error/404", { title: "Edit Habit", layout: "./layouts/main" });
			}

			if (habit.user != req.user.id) {
				res.redirect("/dashboard");
			} else {
				habit = await Habit.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
				res.redirect("/dashboard");
			}
		} catch (error) {
			console.error(error);
			res.render("error/500", { title: "Server Error", layout: "./layouts/main" });
		}
	},
};
