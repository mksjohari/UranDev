import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { checkUserExists, createAccount } from '../../shared/firebase/firebase';
import TempUser from './tempUser';

const dummy = (props) => {
	console.log('props', props);

	return (
		<div>
			<TempUser pid={props.match.params.pid} />
		</div>
	);
};

export default dummy;
