const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Connect to MongoDB database
connectDB();

const app = express();

app.set("view engine", "ejs");

// Static Folder
app.use(express.static("public"));
app.use(expressLayouts);

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions middleware
app.use(
	session({
		secret: "secretsecret",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			mongooseConnection: mongoose.connection,
		}),
		cookie: {
			sameSite: "none",
			secure: true,
			maxAge: 1000 * 60 * 60 * 24, // One day
		},
	}),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors
app.use(flash());

// Set up main routes
app.use("/", mainRoutes);

// Server is running, better catch it..
app.listen(process.env.PORT, console.log(`Server running on port http://localhost:${process.env.PORT}`));
