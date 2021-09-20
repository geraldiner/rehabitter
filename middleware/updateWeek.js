const moment = require("moment");
const Habit = require("../models/Habit");
const getWeek = require("./getWeek");

const updateWeek = async user => {
	let habits = await Habit.find({ user: user }).lean();
	if (habits.length > 0) {
		const startingSunday = habits[0].weeklyStats[0].date;
		const thisWeek = moment().day(0).format("ddd [|] M[/]D");
		if (startingSunday !== thisWeek) {
			for (const habit of habits) {
				try {
					await Habit.findOneAndUpdate(
						{
							_id: habit._id,
						},
						{
							$set: {
								"overallStats": [habit.weeklyStats, ...habit.overallStats],
								"weeklyStats": getWeek(),
							},
						},
					);
				} catch (err) {
					console.log(err);
				}
			}
			habits = await Habit.find({ user: user }).lean();
		}
	}

	return habits;
};

module.exports = updateWeek;
