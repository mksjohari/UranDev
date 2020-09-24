import React from 'react';
import { connect } from 'react-redux';
import Login from '../../shared/Login';
import signIn from '../../shared/signIn';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const Home = (props) => {
	console.log(props.user);
	return (
		<div>
			<Login />
		</div>
	);
};

export default connect(mapStateToProps)(Home);
