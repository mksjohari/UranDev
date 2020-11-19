import React, { useEffect, useState } from 'react';

import CardSmall from './cardSmall';
import Button from '../../shared/sandbox/Button';
import { getFirebase } from '../../shared/firebase/config';
import DraftProjects from './draftProjects';

import ProjectFilter from '../../pages/user/projectFilter';

import styles from '../../modules/projects.module.scss';

const getPublicPreview = async (
	uid,
	fromManage,
	selectedSkills,
	selectedTools,
	setPreviews,
	setAllPreviews,
	applyFilter
) => {
	const previews = [];
	const preview = await getFirebase()
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('projectPreviews')
		.get();
	preview.forEach((doc) => {
		previews.push(doc.data());
	});
	setPreviews(previews);
	setAllPreviews(previews);
	if (fromManage === false) {
		applyFilter(selectedSkills, selectedTools, previews, setPreviews);
	}
};

const applyFilter = (selectedSkills, selectedTools, previews, setPreviews) => {
	const filters = [];
	if (selectedSkills.length !== 0 || selectedTools.length !== 0) {
		previews.forEach((preview) => {
			var skillCount = 0;
			var toolCount = 0;
			selectedSkills.forEach((skill) => {
				if (preview.skills.includes(skill) === true) skillCount += 1;
			});
			selectedTools.forEach((tool) => {
				if (preview.tools.includes(tool) === true) toolCount += 1;
			});
			if (
				skillCount === selectedSkills.length &&
				toolCount === selectedTools.length
			) {
				filters.push(preview);
			}
		});
		setPreviews(filters);
	} else {
		setPreviews(previews);
	}
};

function MyProjects(props) {
	const [previews, setPreviews] = useState([]);
	const [allPreviews, setAllPreviews] = useState([]);
	const [showDrafts, setShowDrafts] = useState(true);
	const [skills, setSkills] = useState();
	const [tools, setTools] = useState();
	const fromManage = props.fromManage;
	const selectedSkills = props.selectedSkills;
	const selectedTools = props.selectedTools;
	const setSelectedSkills = props.setSelectedSkills;
	const setSelectedTools = props.setSelectedTools;
	const hideDrafts = () => setShowDrafts(false);
	useEffect(() => {
		if (props.user.logged) {
			getPublicPreview(
				props.user.uid,
				fromManage,
				selectedSkills,
				selectedTools,
				setPreviews,
				setAllPreviews,
				applyFilter
			);
			setSkills(Object.keys(props.user.skills));
			setTools(Object.keys(props.user.tools));
		}
	}, [props.user, fromManage, selectedSkills, selectedTools]);
	useEffect(() => {
		if (fromManage === false) {
			applyFilter(
				selectedSkills,
				selectedTools,
				allPreviews,
				setPreviews
			);
		}
	}, [selectedSkills, selectedTools, allPreviews, fromManage]);
	return (
		<div className={styles.root}>
			{/* <FindProjects view={props.view} /> */}
			{props.view === 'edit' ? (
				<div className={styles.header}>
					{showDrafts ? (
						<DraftProjects hideDrafts={hideDrafts} />
					) : (
						<Button
							className={styles.add_project}
							text="Add Project"
							iconB="+"
							onClick={() => setShowDrafts(true)}
						/>
					)}
				</div>
			) : (
				<>
					<ProjectFilter
						selectedSkills={selectedSkills}
						selectedTools={selectedTools}
						setSelectedSkills={setSelectedSkills}
						setSelectedTools={setSelectedTools}
						skills={skills}
						tools={tools}
					/>
				</>
			)}
			<div className={styles.project_section}>
				{props.view === 'edit' && (
					<h3 className={styles.section_title}>All Projects</h3>
				)}
				<div className={styles.flex_grid}>
					{previews.map((preview, index) => {
						return (
							<CardSmall
								key={index}
								uid={props.user.uid}
								preview={preview}
								view={props.view}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default MyProjects;
