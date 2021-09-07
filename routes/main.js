const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");

// @desc  Landing page
// @route GET /
router.get("/", ensureGuest, homeController.getIndex);

// @desc  Login form
// @route GET /login
router.get("/login", authController.getLogin);

module.exports = router;
