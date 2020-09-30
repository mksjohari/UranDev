import React from 'react';
import { Button } from '@material-ui/core';
import { getUserInfo, createAccount } from '../../shared/firebase/functions';

const profile = (props) => {
	const id = props.match.params.id;
	console.log(id);

	return (
		<div>
			<h1>Hello,</h1>
			<p>{id}</p>
			<Button
				color="secondary"
				variant="contained"
				onClick={() => {
					getUserInfo({ uid: id })
						.then(async (result) => {
							console.log(result);
						})
						.catch((err) => console.log(err));
				}}
			>
				test user
			</Button>
			<Button
				color="secondary"
				variant="contained"
				onClick={async () => {
					createAccount()
						.then((result) => {
							console.log(result);
						})
						.catch((err) => console.log(err));
				}}
			>
				set
			</Button>
		</div>
	);
};

export default profile;
