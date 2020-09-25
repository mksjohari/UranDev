import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Layout from './shared/layout';
import signUp from './pages/home/signUp';
import explore from './pages/explore/explore';
import projects from './pages/projects/projects';
import profile from './pages/profile/profile';
import "./styles/index.scss";
require("typeface-poppins");

const Index = () => {
	let location = useLocation();
	return (
		<Layout page={location.pathname}>
			<Switch>
				<Route component={explore} exact path="/" />
				<Route component={signUp} path="/signUp" />
				<Route component={projects} path="/projects" />
				<Route component={profile} path="/profile" />
			</Switch>
		</Layout>
	);
};

export default Index;
