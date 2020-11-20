import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MyProjects from './myProjects';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const Projects = (props) => {
	const history = useHistory();
	const uid = props.match.params.uid;
	useEffect(() => {
		if (uid !== props.user.uid) {
			history.push('/');
		}
	}, [history, uid, props.user.uid]);
	return (
		<div>
			<MyProjects user={props.user} fromManage={true} view="edit" />
		</div>
	);
};

export default connect(mapStateToProps)(Projects);
