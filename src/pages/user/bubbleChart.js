import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class BubbleChart extends Component {
	constructor(props) {
		super(props);
		this.renderChart = this.renderChart.bind(this);
		this.renderBubbles = this.renderBubbles.bind(this);
		this.renderLegend = this.renderLegend.bind(this);
	}

	componentDidMount() {
		this.svg = ReactDOM.findDOMNode(this);
		this.renderChart();
	}

	componentDidUpdate() {
		const { width, height } = this.props;
		if (width !== 0 && height !== 0) {
			this.renderChart();
		}
	}

	render() {
		const { width, height } = this.props;
		return <svg width={width} height={height} />;
	}

	renderChart() {
		const {
			overflow,
			graph,
			data,
			height,
			width,
			padding,
			showLegend,
			legendPercentage,
		} = this.props;
		// Reset the svg element to a empty state.
		this.svg.innerHTML = '';
		// Allow bubbles overflowing its SVG container in visual aspect if props(overflow) is true.
		if (overflow) this.svg.style.overflow = 'visible';

		const bubblesWidth = showLegend
			? width * (1 - legendPercentage / 100)
			: width;
		const legendWidth = width - bubblesWidth;
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		const pack = d3
			.pack()
			.size([bubblesWidth * graph.zoom, bubblesWidth * graph.zoom])
			.padding(padding);

		// Process the data to have a hierarchy structure;
		const root = d3
			.hierarchy({ children: data })
			.sum(function (d) {
				return d.value;
			})
			.sort(function (a, b) {
				return b.value - a.value;
			})
			.each((d) => {
				if (d.data.label) {
					d.label = d.data.label;
					d.id = d.data.label.toLowerCase().replace(/ |\//g, '-');
				}
			});

		// Pass the data to the pack layout to calculate the distribution.
		const nodes = pack(root).leaves();

		// Call to the function that draw the bubbles.
		this.renderBubbles(bubblesWidth, nodes, color);
		// Call to the function that draw the legend.
		if (showLegend) {
			this.renderLegend(legendWidth, height, bubblesWidth, nodes, color);
		}
	}

	renderBubbles(width, nodes, color) {
		const {
			graph,
			bubbleClickFun,
			isSkills,
			setAbout,
			setSelectedSkills,
			setSelectedTools,
			valueFont,
			labelFont,
		} = this.props;

		const type = this.props.type;

		const bubbleChart = d3
			.select(this.svg)
			.append('g')
			.attr('class', 'bubble-chart')
			.attr('transform', function (d) {
				return (
					'translate(' +
					width * graph.offsetX +
					',' +
					width * graph.offsetY +
					')'
				);
			});

		const node = bubbleChart
			.selectAll('.node')
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.attr('transform', function (d) {
				return 'translate(' + d.x + ',' + d.y + ')';
			})
			.on('click', function (event, d) {
				bubbleClickFun(
					d.label,
					isSkills,
					setAbout,
					setSelectedSkills,
					setSelectedTools
				);
			});

		node.append('circle')
			.attr('id', function (d) {
				return d.id;
			})
			.attr('r', function (d) {
				return d.r - d.r * 0.04;
			})
			.style('fill', function (d) {
				return d.data.color ? d.data.color : color(nodes.indexOf(d));
			})
			.style('z-index', 1)
			.style('transition', '0.3s all ease-in-out')
			.style('cursor', 'pointer')
			.on('mouseover', function (event, d) {
				d3.select(this).attr('r', d.r * 1.04);
			})
			.on('mouseout', function (event, d) {
				const r = d.r - d.r * 0.04;
				d3.select(this).attr('r', r);
			});

		node.append('clipPath')
			.attr('id', function (d) {
				return 'clip-' + d.id;
			})
			.append('use')
			.attr('xlink:href', function (d) {
				return '#' + d.id;
			});

		node.append('text')
			.attr('class', 'value-text' + type)
			.style('font-size', `${valueFont.size}px`)
			.attr('clip-path', function (d) {
				return 'url(#clip-' + d.id + ')';
			})
			.style('font-weight', (d) => {
				return valueFont.weight ? valueFont.weight : 600;
			})
			.style('font-family', valueFont.family)
			.style('fill', (d) => {
				return d.data.text ? d.data.text : '#000';
			})
			.style('stroke', () => {
				return valueFont.lineColor ? valueFont.lineColor : '#000';
			})
			.style('stroke-width', () => {
				return valueFont.lineWeight ? valueFont.lineWeight : 0;
			})
			.style('cursor', 'pointer')
			.text(function (d) {
				return d.value;
			});

		node.append('text')
			.attr('class', 'label-text' + type)
			.style('font-size', `${labelFont.size}px`)
			.attr('clip-path', function (d) {
				return 'url(#clip-' + d.id + ')';
			})
			.style('font-weight', (d) => {
				return labelFont.weight ? labelFont.weight : 600;
			})
			.style('font-family', labelFont.family)
			.style('fill', (d) => {
				return d.data.text ? d.data.text : '#000';
			})
			.style('stroke', () => {
				return labelFont.lineColor ? labelFont.lineColor : '#000';
			})
			.style('stroke-width', () => {
				return labelFont.lineWeight ? labelFont.lineWeight : 0;
			})
			.style('cursor', 'pointer')
			.text(function (d) {
				// console.log("d label ", d.label, "d id ", d.id);
				return d.label;
			});

		// console.log(this.props);
		// Center the texts inside the circles.
		d3.selectAll('.label-text' + type)
			.style('font-size', function (d) {
				return d.r / 5;
			})
			// .attr("x", function (d) {
			//     const self = d3.select(this);
			//     const width = self.node().getBBox().width;
			//     return -(width / 2);
			// })
			.style('opacity', function (d) {
				d.hideLabel = d.r / 5 < 5 ? 1 : 0;
				return d.hideLabel ? 0 : 1;
			})
			.attr('y', function (d) {
				return d.r * 0.2;
			})
			.call(wrap);

		//	console.log("done");

		// Center the texts inside the circles.
		d3.selectAll('.value-text' + type)
			.attr('x', function (d) {
				const self = d3.select(this);
				const width = self.node().getBBox().width;
				return -(width / 2);
			})
			.attr('y', function (d) {
				if (d.hideLabel) {
					return d.r / 5 / 3;
				} else {
					return -(d.r / 5) * 0.5;
				}
			})
			.attr('dy', function (d) {
				if (d.hideLabel) {
					return d.r / 5 / 3;
				} else {
					return -0.15 + 'em';
				}
			}); // put the number a little higher up

		node.append('title').text(function (d) {
			return d.label;
		});
	}

	renderLegend(width, height, offset, nodes, color) {
		const { legendClickFun, legendFont } = this.props;
		const bubble = d3.select('.bubble-chart');
		const bubbleHeight = bubble.node().getBBox().height;

		const legend = d3
			.select(this.svg)
			.append('g')
			.attr('transform', function () {
				return `translate(${offset},${bubbleHeight * 0.05})`;
			})
			.attr('class', 'legend');

		let textOffset = 0;
		const texts = legend
			.selectAll('.legend-text')
			.data(nodes)
			.enter()
			.append('g')
			.attr('transform', (d, i) => {
				const offset = textOffset;
				textOffset += legendFont.size + 10;
				return `translate(0,${offset})`;
			})
			.on('mouseover', function (event, d) {
				d3.select('#' + d.id).attr('r', d.r * 1.04);
			})
			.on('mouseout', function (event, d) {
				const r = d.r - d.r * 0.04;
				d3.select('#' + d.id).attr('r', r);
			})
			.on('click', function (event, d) {
				legendClickFun(d.label);
			});

		texts
			.append('rect')
			.attr('width', 30)
			.attr('height', legendFont.size)
			.attr('x', 0)
			.attr('y', -legendFont.size)
			.style('fill', 'transparent');

		texts
			.append('rect')
			.attr('width', legendFont.size)
			.attr('height', legendFont.size)
			.attr('x', 0)
			.attr('y', -legendFont.size)
			.style('fill', function (d) {
				return d.data.color ? d.data.color : color(nodes.indexOf(d));
			});

		texts
			.append('text')
			.style('font-size', `${legendFont.size}px`)
			.style('font-weight', (d) => {
				return legendFont.weight ? legendFont.weight : 600;
			})
			.style('font-family', legendFont.family)
			.style('fill', () => {
				return legendFont.color ? legendFont.color : '#000';
			})
			.style('stroke', () => {
				return legendFont.lineColor ? legendFont.lineColor : '#000';
			})
			.style('stroke-width', () => {
				return legendFont.lineWeight ? legendFont.lineWeight : 0;
			})
			.attr('x', (d) => {
				return legendFont.size + 10;
			})
			.attr('y', 0)
			.text((d) => {
				return d.label;
			});
	}
}

BubbleChart.propTypes = {
	overflow: PropTypes.bool,
	graph: PropTypes.shape({
		zoom: PropTypes.number,
		offsetX: PropTypes.number,
		offsetY: PropTypes.number,
	}),
	width: PropTypes.number,
	height: PropTypes.number,
	padding: PropTypes.number,
	showLegend: PropTypes.bool,
	legendPercentage: PropTypes.number,
	legendFont: PropTypes.shape({
		family: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		weight: PropTypes.string,
	}),
	valueFont: PropTypes.shape({
		family: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		weight: PropTypes.string,
	}),
	labelFont: PropTypes.shape({
		family: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		weight: PropTypes.string,
	}),
};
BubbleChart.defaultProps = {
	overflow: false,
	graph: {
		zoom: 1.1,
		offsetX: -0.05,
		offsetY: -0.01,
	},
	width: 1000,
	height: 800,
	padding: 0,
	showLegend: true,
	legendPercentage: 20,
	legendFont: {
		family: 'Arial',
		size: 12,
		color: '#000',
		weight: 'bold',
	},
	valueFont: {
		family: 'Arial',
		size: 16,
		color: '#fff',
		weight: 'bold',
	},
	labelFont: {
		family: 'Arial',
		size: 11,
		color: '#fff',
		weight: 'normal',
	},
	bubbleClickFun: (
		label,
		isSkills,
		setAbout,
		setSelectedSkills,
		setSelectedTools
	) => {
		if (isSkills) {
			setSelectedSkills([label]);
			setSelectedTools([]);
		} else {
			setSelectedSkills([]);
			setSelectedTools([label]);
		}
		setAbout(false);
	},
	legendClickFun: () => {},
};

function wrap(text) {
	text.each(function () {
		// console.log(d3.select(this.parentNode).text());
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(), // apple, orange
			width = d3.select(this.parentNode).select('circle').attr('r') * 2,
			word,
			line = [], // orange, apple
			lineNumber = 0, //2
			lineHeight = 1.1, // ems
			x = -(text.node().getBBox().width + 4) / 2,
			y = text.attr('y'),
			dy = 0, //parseFloat(text.attr("dy")),
			tspan = text
				.text(null)
				.append('tspan')
				.attr('x', x)
				.attr('y', y)
				.attr('dy', dy + 'em');
		// console.log("words " , words);
		while ((word = words.pop())) {
			// 1. word = orange		2. word = apple
			line.push(word); // 1. line = [orange]	2. line = [orange, apple]		3. line = [orange]
			tspan.text(line.join(' ')); // 1. tspan.text = orange' '		2. tspan.text= orange' 'apple' '
			// console.log(x)
			// console.log(word + ' ' + -(text.node().getBBox().width + 4) / 2 + ' ' +width);
			if (tspan.node().getComputedTextLength() > width) {
				// 2. True
				// console.log(text)
				line.pop();
				tspan.text(line.join(' '));
				tspan.attr('x', -tspan.node().getBBox().width / 2);
				line = [word];
				tspan = text
					.append('tspan')
					.attr('x', -tspan.node().getBBox().width / 2) // 3. apple in middle
					.attr('y', y)
					.attr('dy', ++lineNumber * lineHeight + dy + 'em') // apple in 2nd line
					.text(word); // 3. tspan.text = apple

				// console.log(word + ' ' + -(tspan.node().getBBox().width) / 2);
			}
			// console.log("line " , line);
		}
	});
}
