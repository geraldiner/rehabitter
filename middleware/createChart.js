const D3Node = require("d3-node");
const moment = require("moment");

const createChart = habit => {
	const d3n = new D3Node({ selector: "#chart-map", container: '<div class="chart"><div id="chart-map"></div></div>' });

	const settings = {
		gutter: 3,
		item_gutter: 1,
		label_padding: 40,
		width: 1000,
		height: 200,
		item_size: 15,
		complete_color: "#40C463",
		incomplete_color: "#dddddd",
		tooltip_width: 250,
		tooltip_padding: 15,
	};

	let combined = [...habit.weeklyStats];
	for (const week of habit.overallStats) {
		for (const day of week) {
			combined.push(day);
		}
	}

	const year_start = moment().startOf("year");
	const habit_start = moment(habit.weeklyStats[0].date);
	const year_end = moment().endOf("year");
	const empty_days = habit_start.diff(year_start, "days");
	const year_days = [];

	if (empty_days > 0) {
		for (let i = 1; i <= empty_days; i++) {
			let d = moment().dayOfYear(i);
			let day = {
				date: d.format("YYYY-MM-DD"),
				date_string: d.format("ddd [|] M[/]D"),
				completed: false,
			};
			year_days.push(day);
		}
	}

	const year_data = combined.filter(d => year_start <= moment(d.date) && moment(d.date) < year_end);
	const data = year_days.concat(year_data);

	// Sort data from oldest to newest
	data.sort((a, b) => new Date(a.date) - new Date(b.date));

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

	const svg = d3n.createSVG(1000, 200);

	const items = svg.append("g");
	const labels = svg.append("g");
	const months = d3n.d3.timeMonths(year_start, year_end);
	const tooltip = d3n.d3.select(d3n.document.querySelector(".chart")).append("div").attr("class", "cal-tooltip").style("opacity", 0);
	const monthScale = d3n.d3.scaleLinear().range([0, settings.width]).domain([0, months.length]);
	for (let i = 255; i <= 266; i++) {
		console.log(data[i]);
	}

	labels
		.selectAll("g")
		.data(months)
		.enter()
		.append("text")
		.text(d => {
			return moment(d).format("MMM");
		})
		.attr("x", (d, i) => {
			return monthScale(i) + (monthScale(i) - monthScale(i - 1)) / 2;
		})
		.attr("y", settings.label_padding / 2);

	items
		.selectAll("g")
		.data(data)
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

	return d3n.html();
};

module.exports = createChart;
