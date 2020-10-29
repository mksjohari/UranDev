import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Layout from './shared/layout';
import explore from './pages/explore/explore';
import projects from './pages/projects/projects';
import profile from './pages/profile/profile';
import signUp from './pages/signUp/signUp';
import createProject from './pages/projects/createProject';
import draftProjects from './pages/projects/draftProjects';
import tmpTest from './pages/tmp/tmpTest';
import Page404 from './pages/404/404';
import dummy from './pages/profile/dummy';
import './styles/index.scss';
import Home from './pages/home/home';
require('typeface-poppins');

const Index = () => {
	let location = useLocation();
	return (
		<Layout page={location.pathname}>
			<Switch>
				<Route component={explore} path="/explore" />
				<Route component={signUp} path="/signUp" />
				<Route component={projects} path="/projects" />
				<Route component={createProject} path="/create" />
				<Route component={draftProjects} path="/drafts" />
				<Route component={profile} path="/profile/:pid" />
				<Route component={dummy} path="/redirect:pid" />
				<Route component={Home} exact path="/" />
				<Route component={Page404} path="/*" />
			</Switch>
		</Layout>
	);
};
export default Index;
