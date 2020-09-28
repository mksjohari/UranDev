import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { getFirebase, getFunctions } from '../../shared/firebase';
import { Button } from '@material-ui/core';

const getUserInfo = getFunctions(firebase).httpsCallable('getUser');
const addMe = getFunctions(firebase).httpsCallable('testCall');

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
					addMe()
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

var data = [
	{
		_id: 'bubble1', // unique id (required)
		value: 50, // used to determine relative size of bubbles (required)
		displayText: 'Number Theory', // will use _id if undefined
		colorValue: 0, // used to determine color
		selected: true, // if true will use selectedColor/selectedTextColor for circle/text
	},
	{
		_id: 'bubble2', // unique id (required)
		value: 5, // used to determine relative size of bubbles (required)
		displayText: 'HTML', // will use _id if undefined
		colorValue: 3, // used to determine color
		selected: true, // if true will use selectedColor/selectedTextColor for circle/text
	},
];
