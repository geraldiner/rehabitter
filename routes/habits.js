const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Habit = require("../models/Habit");
const habitsController = require("../controllers/habits");

// @desc  Form to add a new habit
// @route GET /habits/add
router.get("/add", ensureAuth, habitsController.addHabit);

// @desc  Process form to add a new habit
// @route POST /habits
router.post("/", ensureAuth, habitsController.postHabit);

// @desc  Show the edit habit page
// @route GET /habits/edit/:id
router.get("/edit/:id", ensureAuth, habitsController.editHabit);

// @desc  Update habit
// @route PUT /habits/:id
router.put("/:id", ensureAuth, habitsController.postEdit);

// @desc  Delete a habit
// @route DELETE /habits/:id
router.delete("/:id", ensureAuth, habitsController.deleteHabit);

// @desc  Mark a habit completed for a day of the week
// @route PUT /habits/mark/:id
router.put("/mark/:id", ensureAuth, habitsController.markHabit);

// @desc  View charts for a specific habit
// @route GET /habits/chart/:id
router.get("/chart/:id", ensureAuth, habitsController.getChart);

module.exports = router;
