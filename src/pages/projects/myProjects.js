import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FindProjects from '../../shared/sandbox/FindProjects';
import CardSmall from './cardSmall';
import styles from '../../modules/projects.module.scss';
import Button from '../../shared/sandbox/Button';
import { getFirebase } from '../../shared/firebase/config';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const getPublicPreview = async (uid, setPreviews) => {
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
};

function MyProjects(props) {
	const [previews, setPreviews] = useState([]);
	useEffect(() => {
		getPublicPreview(props.user.uid, setPreviews);
	}, []);
	return (
		<div className={styles.root}>
			<FindProjects view={props.view} />
			{props.view === 'edit' ? (
				<div className={styles.center}>
					<Link to="/drafts">
						<Button
							className={styles.add_project}
							text="Add project"
							iconB="+"
						/>
					</Link>
				</div>
			) : (
				''
			)}
			<div className={styles.project_section}>
				<h3 className={styles.section_title}>2020</h3>
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
export default connect(mapStateToProps)(MyProjects);
