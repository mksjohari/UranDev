import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Layout from './shared/layout';
import explore from './pages/explore/explore';
import projects from './pages/projects/projects';
import User from './pages/user/user';
import signUp from './pages/signUp/signUp';
import createProject from './pages/projects/createProject';
import settings from './pages/user/settings';
import draftProjects from './pages/projects/draftProjects';
import redirectUser from './pages/redirects/redirectUser';
import redirectProject from './pages/redirects/redirectProject';
import Page404 from './pages/404/404';
import './styles/index.scss';
import Home from './pages/home/home';
import ProjectPage from './pages/projects/projectPage';
import editProject from './pages/projects/editProject';
require('typeface-poppins');

const Index = () => {
	let location = useLocation();
	return (
		<Layout page={location.pathname}>
			<Switch>
				<Route component={explore} path="/explore" />
				<Route component={signUp} path="/signUp" />
				<Route
					component={ProjectPage}
					path="/users/:uid/projects/:pid"
				/>
				<Route component={projects} path="/users/:uid/projects" />
				<Route component={createProject} path="/create" />
				<Route component={editProject} path="/edit" />
				<Route component={draftProjects} path="/drafts" />
				<Route component={User} path="/users/:uid" />

				<Route component={settings} path="/settings" />
				<Route component={redirectUser} path="/redirect-user-:uid" />
				<Route
					component={redirectProject}
					path="/redirect-:uid-project-:pid"
				/>
				<Route component={Home} exact path="/" />
				<Route component={Page404} path="/*" />
			</Switch>
		</Layout>
	);
};
export default Index;
