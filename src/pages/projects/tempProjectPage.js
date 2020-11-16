import React, { useState, useEffect } from 'react';
import { getFirebase } from '../../shared/firebase/config';

const getProjectInfo = async (uid, pid, setData, setLoading, setDataLoaded) => {
	const ref = getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid);
	const projectInfo = await ref.get();
	setData(projectInfo.data());
	setLoading(false);
	setDataLoaded(true);
};

const getProjectTasks = async (uid, pid, data) => {
	const tasks = [];
	const ref = getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projects')
		.doc(pid);
	const projectTasks = await ref.collection('tasks').get();
	projectTasks.forEach((taskRaw) => {
		const task = {
			title: taskRaw.data().title,
			description: taskRaw.data().description,
			index: taskRaw.data().index,
			startDate: taskRaw.data().startDate,
			endDate: taskRaw.data().endDate,
		};
		console.log(taskRaw.id, '=>', taskRaw.data());
	});
};

function TempProjectPage(props) {
	const uid = props.match.params.uid;
	const pid = props.match.params.pid;
	const [data, setData] = useState();
	const [dataLoaded, setDataLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState();
	useEffect(() => {
		if (!dataLoaded)
			getProjectInfo(uid, pid, setData, setLoading, setDataLoaded);
		else {
			if (data !== null) {
				getProjectTasks(uid, pid, data, setTasks, dataLoaded);
			}
		}
	}, [uid, pid, data, dataLoaded]);
	// useEffect(()=>{
	// 	getProjectTasks(uid, pid, data, setTasks)
	// }, [uid, pid, data])
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
