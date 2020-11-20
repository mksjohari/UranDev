import React from 'react';
import { useHistory } from 'react-router-dom';

const RedirectUser = (props) => {
	const history = useHistory();
	history.push(`/users/${props.match.params.uid}`);
	return <div>Redirect</div>;
};

export default RedirectUser;
