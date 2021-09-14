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
	weeklyStats: [
		{
			date: { type: String, required: true },
			completed: { type: Boolean, required: true },
		},
	],
	overallStats: [
		[
			{
				date: { type: String, required: true },
				completed: { type: Boolean, required: true },
			},
		],
	],
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
