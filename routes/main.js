const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");

// @desc  Landing page
// @route GET /
router.get("/", homeController.getIndex);

// @desc  Login form
// @route GET /login
router.get("/login", authController.getLogin);

module.exports = router;
