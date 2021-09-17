const moment = require("moment");

const getWeek = () => {
	let week = [];
	for (let i = 0; i <= 6; i++) {
		let d = moment().day(i);
		let day = {
			date: d.format("YYYY-MM-DD"),
			date_string: d.format("ddd [|] M[/]D"),
			completed: false,
		};
		week.push(day);
	}
	return week;
};

module.exports = getWeek;
