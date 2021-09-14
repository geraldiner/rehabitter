const moment = require("moment");

const getWeek = () => {
	let week = [];
	for (let i = 0; i <= 6; i++) {
		let d = moment().day(i).format("ddd [|] M[/]D");
		let day = {
			date: d,
			completed: false,
		};
		week.push(day);
	}
	return week;
};

module.exports = getWeek;
