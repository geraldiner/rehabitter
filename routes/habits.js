const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Habit = require("../models/Habit");

// @desc  Show add a habit page
// @route GET /habits/add
router.get("/add", ensureAuth, (req, res) => {
	const locals = {
		title: "Add New Habit",
		layout: "./layouts/main",
	};
	res.render("habits/add", locals);
});

// @desc  Process add form to add new habit
// @route POST /habits/add
router.post("/", ensureAuth, async (req, res) => {
	try {
		req.body.user = req.user.id;
		await Habit.create(req.body);
		res.redirect("/dashboard");
	} catch {
		console.error(error);
		res.render("error/500");
	}
});

// @desc  Show single habit
// @route GET /habits/:id
router.get("/:id", ensureAuth, async (req, res) => {
	try {
		let habit = await Habit.findById(req.params.id).populate("user").lean();

		if (!habit) {
			return res.render("error/404", { title: "404 Error", layout: "./layouts/main" });
		}

		res.render("habits/show", {
			title: habit.habit,
			layout: "./layouts/main",
			habit: habit,
		});
	} catch (error) {
		console.error(error);
		res.render("error/500", { title: "Server Error", layout: "./layouts/main" });
	}
});

// @desc  Show edit page
// @route GET /habits/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
	try {
		const habit = await Habit.findOne({
			_id: req.params.id,
		}).lean();

		if (!habit) {
			return res.render("error/404", { title: "404 Error", layout: "./layouts/main" });
		}
		if (habit.user != req.user.id) {
			res.redirect("/dashboard");
		} else {
			res.render("habits/edit", { title: "Edit Habit", layout: "./layouts/main", habit: habit });
		}
	} catch {
		console.error(error);
		res.render("error/500", { title: "Server Error", layout: "./layouts/main" });
	}
});

// @desc  Update habit
// @route PUT /habits/:id
router.put("/:id", ensureAuth, async (req, res) => {
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
});

// @desc  Delete a habit
// @route DELETE /habits/:id
router.delete("/:id", ensureAuth, async (req, res) => {
	try {
		await Habit.remove({ _id: req.params.id });
		res.redirect("/dashboard");
	} catch (error) {
		console.error(error);
		res.render("error/500", { title: "Server Error", layout: "./layouts/main" });
	}
});

module.exports = router;
