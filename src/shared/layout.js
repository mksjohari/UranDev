import React from 'react';

import Header from './header';
import Footer from './footer';
import SignIn from './signIn';
import Login from "./Login";

import './modules/layout.scss';

const Layout = (props) => {
	var page = props.page.slice(1, props.page.length)
	return (
		<div className="container">
			<Header />
			<div className={`content ${page}`}>
				{props.children}
			</div>
			{/* <Login /> */}
			<Footer />
		</div>
	);
};

export default Layout;
