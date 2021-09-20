const D3Node = require("d3-node");
const moment = require("moment");

const createChart = habit => {
	const d3n = new D3Node();

	const settings = {
		gutter: 5,
		item_gutter: 1,
		width: 1000,
		height: 200,
		item_size: 10,
		complete_color: "#00ff00",
		incomplete_color: "#bbbbbb",
	};

	// weeklyData
	const data = habit.weeklyStats;

	// create svg container
	const svg = d3n.createSVG(1000, 200);

	const items = svg.append("g");
	const labels = svg.append("g");

	return d3n.svgString();
};

module.exports = createChart;
