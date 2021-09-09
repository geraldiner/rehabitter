const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const habitsController = require("../controllers/habits");

// @desc  Landing page
// @route GET /
router.get("/", ensureGuest, homeController.getIndex);

// @desc  Login form
// @route GET /login
router.get("/login", authController.getLogin);

// @desc  Process login form
// @route POST /login
router.post("/login", authController.postLogin);

// @desc  Logout user
// @route GET /logout
router.get("/logout", authController.getLogout);

// @desc  Dashboard
// @route GET /dashboard
router.get("/dashboard", ensureAuth, habitsController.getDashboard);

module.exports = router;
