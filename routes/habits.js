const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Habit = require("../models/Habit");
