import React from 'react';

function TempPreview(props) {
	alert(props);
	return (
		<div>
			<h1>id: {props.project.projectId}</h1>
			<h2>title: {props.project.title}</h2>
			<hr />
			<h2>Situation</h2>
			<span>Summary: {props.project.situation.summary}</span>
			<span>Role: {props.project.situation.role}</span>
			<span>Team Size: {props.project.situation.teamSize}</span>
			<span>Currency: {props.project.situation.currency.label}</span>
			<span>Budget: {props.project.situation.budget}</span>
			<span>
				Start Date:
				{props.project.situation.projectDates.startDate.format()}
			</span>
			<span>
				End Data:
				{props.project.situation.projectDates.endDate.format()}
			</span>
			<hr />
			<h2>Tasks</h2>
			{props.project.tasks.map((task, index) => {
				return (
					<div>
						<span>Task Title: {task.title}</span>
						<ul key={index}>
							{task.actions.map((action, index) => {
								return <span key={index}>{action.title}</span>;
							})}
						</ul>
					</div>
				);
			})}
			<hr />
			<h2>Results</h2>
			<div>
				<span>Conclusion: {props.project.results.conclusion}</span>
				<ul>
					{props.project.results.links.map((link, index) => {
						return <span key={index}>{link.url}</span>;
					})}
				</ul>
				<ul>
					{props.project.results.sections.map((section, index) => {
						return <span key={index}>{section.sectionId}</span>;
					})}
				</ul>
			</div>
		</div>
	);
}

export default TempPreview;
