import React from "react";

import Header from "./sections/shared/header";
import Footer from "./sections/shared/footer";

import layoutStyles from "./modules/layout.module.scss";
import SignIn from "./sections/shared/signIn";

const Layout = (props) => {
    return (
        <div className={layoutStyles.container}>
            <Header />
            {/* <div className={layoutStyles.content}>{props.children}</div> */}
            <SignIn />
            <Footer />
        </div>
    );
};

export default Layout;
