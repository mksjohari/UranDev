import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { checkUserExists, createAccount } from '../../shared/firebase/firebase';

const TempUser = (props) => {
	console.log('props', props);
	const history = useHistory();
	history.push(`/profile/${props.pid}`);
	return (
		<div>
			<h1>Hello,</h1>
			{`/profile/${props.pid}`}
		</div>
	);
};

export default TempUser;
