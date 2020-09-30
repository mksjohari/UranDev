import React from 'react';
import WordBubble from './bubbleChart';
import Button from '../../shared/sandbox/Button';
import ProfileDetails from './profileDetails';

const profile = () => {
	return (
		<div className="parent">
			<WordBubble />
			<ProfileDetails />
			<Button
				colour="yellow"
				iconR={<i className="fas fa-check" />}
				text="Accept"
			/>
		</div>
	);
};

export default profile;
