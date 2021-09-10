const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Habit = require("../models/Habit");
const habitsController = require("../controllers/habits");

// @desc  Form to add a new habit
// @route GET /add
router.get("/add", ensureAuth, habitsController.addHabit);

// @desc  Process form to add a new habit
// @route POST /
router.post("/", ensureAuth, habitsController.postHabit);

module.exports = router;
