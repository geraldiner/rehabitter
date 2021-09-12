const moment = require("moment");

const getWeek = () => {
	let week = [];
	for (let i = 0; i <= 6; i++) {
		let d = moment().day(i).format("ddd [|] M[/]D");
		week.push(d);
	}
	return week;
};

module.exports = getWeek;
