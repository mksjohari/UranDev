import React from 'react';
import { useHistory } from 'react-router-dom';

const RedirectProject = (props) => {
	const history = useHistory();
	const uid = props.match.params.uid;
	const pid = props.match.params.pid;
	history.push(`/users/${uid}/projects/${pid}`);
	return <div>Redirect</div>;
};

export default RedirectProject;
