import React from 'react';

import Header from './header';
import Footer from './footer';

import layoutStyles from './modules/layout.module.scss';
import SignIn from './signIn';

const Layout = (props) => {
	return (
		<div className={layoutStyles.container}>
			<Header />
			<div className={layoutStyles.content}>{props.children}</div>
			{/* <SignIn /> */}
			<Footer />
		</div>
	);
};

export default Layout;
