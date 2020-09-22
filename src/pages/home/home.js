import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const Home = (props) => {
	console.log(props.user);
	return (
		<div>
			<h1>Hello,</h1>
			<p>KHAIRRI JOHARI</p>
		</div>
	);
};

export default connect(mapStateToProps)(Home);
