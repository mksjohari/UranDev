import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import Header from "./header";
import Footer from "./footer";
import Login from ".././shared/Login";

import "./modules/layout.scss";

const Layout = (props) => {
    const [show, setShow] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toLogin = () => {
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
            <Header toLogin={toLogin} toSignUp={toSignUp} />
            <div className={`content ${page}`}>{props.children}</div>
            <Footer />
            {show ? (
                <div id="modal">
                    <Login
                        onClose={handleClose}
                        signUp={signUp}
                        toLogin={toLogin}
                        toSignUp={toSignUp}
                    />
                </div>
            ) : (
                ""
            )}
            {/* <Modal
                show={show}
                onHide={handleClose}
                centered
                style={{ paddingTop: "25%" }}
            >
                <Login />
            </Modal> */}
        </div>
    );
};

export default Layout;
