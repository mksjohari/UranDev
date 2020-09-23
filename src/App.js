import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './shared/layout';
import Home from './pages/home/home';
import explore from './pages/explore/explore';
import projects from './pages/projects/projects';
import profile from './pages/profile/profile';
import "./styles/index.scss";
require("typeface-poppins");

const Index = () => {
	return (
		<Layout>
			<Switch>
				<Route component={Home} exact path="/" />
				<Route component={explore} path="/explore" />
				<Route component={projects} path="/projects" />
				<Route component={profile} path="/profile" />
			</Switch>
		</Layout>
	);
};

export default Index;
