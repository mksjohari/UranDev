import React from 'react';
import { connect } from 'react-redux';
import Login from '../../shared/Login';
import signIn from '../../shared/signIn';
import Tab from '../../shared/Tab';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const Home = (props) => {
	console.log(props.user);
	return (
		<div>
			<Login />
			<Tab />
		</div>
	);
};

export default connect(mapStateToProps)(Home);
