import React from 'react';

import { withContext } from '../../shared/react-dims';
import BubbleChart from './bubbleChart';
// import Actions          from '../Actions';

const bubbleColour = {
	skill: ['#fad47a', '#FAEBB3'],
	tool: ['#3E4D74', '#AFDEE9'],
};

const fontColour = {
	skill: ['#3e4d74', '#3e4d74'],
	tool: ['#FAEBB3', '#3e4d74'],
};

function bubbleData(data, type) {
	const output = [];
	data.forEach((element) => {
		let label = element[0];
		let value = element[1];
		let color = value > 10 ? bubbleColour[type][0] : bubbleColour[type][1];
		let text = value > 10 ? fontColour[type][0] : fontColour[type][1];
		output.push({ label, value, color, text });
	});
	return output;
}

function WordBubble(props) {
	const bubbleClick = () => {};
	const legendClick = () => {};
	return (
		<div>
			<BubbleChart
				isSkills={props.isSkills}
				setAbout={props.setAbout}
				setSelectedSkills={props.setSelectedSkills}
				setSelectedTools={props.setSelectedTools}
				graph={{
					zoom: 1.0,
					offsetX: 0,
					offsetY: 0,
				}}
				width={
					window.innerWidth < 992
						? props.dims.width * 0.6
						: props.dims.width * 0.4
				}
				// height={
				// 	window.innerWidth < 992
				// 		? props.dims.width * 0.6
				// 		: props.dims.width * 0.4
				// }
				overflow={true}
				padding={10} // optional value, number that set the padding between bubbles
				showLegend={false} // optional value, pass false to disable the legend.
				valueFont={{
					family: 'Poppins',
					size: 12,
					weight: 'bold',
				}}
				labelFont={{
					family: 'Poppins',
					size: 14,
					weight: '500',
				}}
				//Custom bubble/legend click functions such as searching using the label, redirecting to other page
				bubbleClickFunc={bubbleClick}
				legendClickFun={legendClick}
				data={bubbleData(props.data, props.type)}
				type={props.type}
			/>
		</div>
	);
}

export default withContext(WordBubble);
