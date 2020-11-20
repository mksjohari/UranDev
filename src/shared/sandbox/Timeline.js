import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import '../../modules/timeline.scss';

function Timeline(props) {
	return (
		<div className="timeline">
			<ProgressBar
				percent={props.percent}
				filledBackground="#bbbbbb"
				height="3px"
				width={props.width ? props.width : 600}
			>
				<Step>
					{({ accomplished, position }) => (
						<div
							className={`indexedStep ${
								accomplished ? 'accomplished' : ''
							} ${props.percent === position ? 'current' : ''}`}
						>
							{props.percent > position ? (
								<i className="fas fa-check" />
							) : (
								''
							)}
							<p className="timeline-label">{props.label[0]}</p>
						</div>
					)}
				</Step>
				<Step>
					{({ accomplished, position }) => (
						<div
							className={`indexedStep ${
								accomplished ? 'accomplished' : ''
							} ${props.percent === position ? 'current' : ''}`}
						>
							{props.percent > position ? (
								<i className="fas fa-check" />
							) : (
								''
							)}
							<p className="timeline-label">{props.label[1]}</p>
						</div>
					)}
				</Step>
				<Step>
					{({ accomplished, position }) => (
						<div
							className={`indexedStep ${
								accomplished ? 'accomplished' : ''
							} ${props.percent === position ? 'current' : ''}`}
						>
							{props.percent > position ? (
								<i className="fas fa-check" />
							) : (
								''
							)}
							<p className="timeline-label">{props.label[2]}</p>
						</div>
					)}
				</Step>
				<Step>
					{({ accomplished, position }) => (
						<div
							className={`indexedStep ${
								accomplished ? 'accomplished' : ''
							} ${props.percent === position ? 'current' : ''}`}
						>
							{props.percent > position ? (
								<i className="fas fa-check" />
							) : (
								''
							)}
							<p className="timeline-label">{props.label[3]}</p>
						</div>
					)}
				</Step>
			</ProgressBar>
		</div>
	);
}

export default Timeline;
