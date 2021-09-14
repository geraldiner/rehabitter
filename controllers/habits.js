const D3Node = require("d3-node");
const Habit = require("../models/Habit");
const getWeek = require("../middleware/getWeek");

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
			await Habit.create({ weeklyStats: getWeek(), overallStats: [], ...req.body });
			res.redirect("/dashboard");
		} catch (error) {
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
	deleteHabit: async (req, res) => {
		try {
			await Habit.deleteOne({ _id: req.params.id });
			res.redirect("/dashboard");
		} catch (error) {
			console.error(error);
			res.render("error/500", { title: "Server Error", layout: "./layouts/main" });
		}
	},
	markHabit: async (req, res) => {
		try {
			await Habit.findOneAndUpdate(
				{
					_id: req.params.id,
					"weeklyStats._id": req.body.dayId,
				},
				{
					$set: {
						"weeklyStats.$.completed": req.body.value,
					},
				},
			);
			res.json("Habit has been updated");
		} catch (err) {
			console.log(err);
		}
	},
	getChart: async (req, res) => {
		try {
			const habit = await Habit.findOne({ _id: req.params.id });
			const d3n = new D3Node();
			d3n.createSVG(10, 30).append("g");
			const locals = {
				title: "Charts",
				layout: "../views/layouts/main",
				user: req.user,
				habit: habit,
				svg: d3n.svgString(),
			};
			res.render("../views/habits/charts.ejs", locals);
		} catch (err) {
			console.log(err);
		}
	},
};
