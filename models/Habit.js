const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	gives: {
		type: String,
		require: true,
		trim: true,
	},
	replacement: {
		type: String,
		require: true,
		trim: true,
	},
	change: {
		type: String,
		required: true,
		trim: true,
	},
	status: {
		type: String,
		required: true,
		trim: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Habit", HabitSchema);
// "start": "concurrently \"npm run start:watch:*\" \"npm run start:server\"",
// "start:server": "nodemon server",
// "start:tailwind": "postcss ./public/css/tailwind.src.css -o ./public/css/tailwind.css",
// "start:watch:config": "onchange -k './tailwind.config.js' -- npm run start:tailwind",
// "start:watch:src": "onchange --await-write-finish 2000 'public/css/tailwind.src.css' -- npm run start:tailwind"
