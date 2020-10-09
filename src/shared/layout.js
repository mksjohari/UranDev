import React, { useState } from "react";

import Header from "./header";
import Footer from "./footer";
import SignIn from "./signIn";
import SignUp from "./signUp";

import "../modules/layout.scss";

const Layout = (props) => {
    const [show, setShow] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toSignIn = () => {
        handleShow();
        setSignUp(false);
    };
    const toSignUp = () => {
        handleShow();
        setSignUp(true);
    };
    var page = props.page.slice(1, props.page.length);
    return (
        <div className={`container`}>
            <Header toLogin={toSignIn} toSignUp={toSignUp} />
            <div className={`content ${page}`}>{props.children}</div>
            <Footer />
            {show ? (
                <div id="modal">
                    {signUp ? (
                        <SignUp
                            onClose={handleClose}
                            signUp={signUp}
                            toSignIn={toSignIn}
                            toSignUp={toSignUp}
                        />
                    ) : (
                        <SignIn
                            onClose={handleClose}
                            signUp={signUp}
                            toSignIn={toSignIn}
                            toSignUp={toSignUp}
                        />
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Layout;
