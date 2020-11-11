import React, { useState, useEffect } from 'react';
import { getFirebase } from '../../shared/firebase/config';

const getProjectInfo = async (uid, pid, setData, setLoading) => {
	const projectInfo = await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid)
		.get();
	console.log(projectInfo.data());
	setData(projectInfo.data());
	setLoading(false);
};

function TempProjectPage(props) {
	const uid = props.match.params.uid;
	const pid = props.match.params.pid;
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getProjectInfo(uid, pid, setData, setLoading);
	}, []);
	return (
		<div>
			{!loading && (
				<div>
					<h1>id: {data.pid}</h1>
					<h2>title: {data.title}</h2>
					<hr />
					<h2>Situation</h2>
					<span>Summary: {data.situation.summary}</span>
					<br />
					<span>Role: {data.situation.role}</span>
					<br />
					<span>Team Size: {data.situation.teamSize}</span>
					<br />
					<span>Currency: {data.situation.currency.label}</span>
					<br />
					<span>Budget: {data.situation.budget}</span>
					<br />
					<span>
						Start Date:{' '}
						{data.situation.startDate.toDate().toString()}
						<br />
					</span>
					<span>
						End Data: {data.situation.endDate.toDate().toString()}
					</span>
					<hr />
					<h2>Tasks</h2>
					{data.tasks &&
						data.tasks.map((task, index) => {
							return (
								<div>
									<span>Task Title: {task.title}</span>
									<ul key={index}>
										{task.actions.map((action, index) => {
											return (
												<span key={index}>
													{action.title}
													<br />
												</span>
											);
										})}
									</ul>
								</div>
							);
						})}
					<hr />
					<h2>Results</h2>
					<div>
						<span>Conclusion: {data.results.conclusion}</span>
						<ul>
							{data.results.links &&
								data.results.links.map((link, index) => {
									return (
										<span key={index}>
											{link.url}
											<br />
										</span>
									);
								})}
						</ul>
						<ul>
							{data.results.sections &&
								data.results.sections.map((section, index) => {
									return (
										<span key={index}>
											{section.sectionId}
											<br />
										</span>
									);
								})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default TempProjectPage;
