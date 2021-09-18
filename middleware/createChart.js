const D3Node = require("d3-node");
const moment = require("moment");

const createChart = habit => {
	const d3n = new D3Node();

	const settings = {
		gutter: 5,
		item_gutter: 1,
		label_padding: 40,
		width: 1000,
		height: 200,
		item_size: 10,
		complete_color: "#40C463",
		incomplete_color: "#dddddd",
	};

	// All data so far
	let data = [...habit.weeklyStats];
	for (const week of habit.overallStats) {
		data = [...data, ...week];
	}

	const year_start = moment().startOf("year");
	const habit_start = moment(habit.createdAt);
	console.log(habit_start);
	const year_end = moment().endOf("year");
	const empty_days = habit_start.diff(year_start, "days") + 1;

	const year_data = data.filter(d => year_start <= moment(d.date) && moment(d.date) < year_end);

	if (empty_days > 0) {
		for (let i = 1; i < empty_days; i++) {
			let d = moment().dayOfYear(i);
			let day = {
				date: d.format("YYYY-MM-DD"),
				date_string: d.format("ddd [|] M[/]D"),
				completed: false,
			};
			year_data.push(day);
		}
	}

	// Sort data from oldest to newest
	year_data.sort((a, b) => new Date(a.date) - new Date(b.date));

	const calcItemX = d => {
		const date = moment(d.date);
		const dayIndex = Math.round((date - moment(year_start).startOf("week")) / 86400000);
		const colIndex = Math.trunc(dayIndex / 7);
		return colIndex * (settings.item_size + settings.gutter) + settings.label_padding;
	};

	const calcItemY = d => {
		return settings.label_padding + moment(d.date).weekday() * (settings.item_size + settings.gutter);
	};

	const colorItem = d => {
		return d.completed ? settings.complete_color : settings.incomplete_color;
	};

	// create svg container
	const svg = d3n.createSVG(1000, 200);

	const items = svg.append("g");

	items
		.selectAll("g")
		.data(year_data)
		.enter()
		.append("rect")
		.attr("x", function (d) {
			return calcItemX(d) + settings.item_size / 2;
		})
		.attr("y", function (d) {
			return calcItemY(d) + settings.item_size / 2;
		})
		.attr("width", settings.item_size)
		.attr("height", settings.item_size)
		.attr("fill", function (d) {
			return colorItem(d);
		});

	return d3n.svgString();
};

module.exports = createChart;
