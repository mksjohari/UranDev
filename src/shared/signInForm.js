import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "./sandbox/Button";
import Loader from "./Loader";
import { getFirebase } from "./firebase/config";
import { checkUserExists, createAccount, getUID } from "./firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "../modules/loginform.scss";
import { updateInfo, updateInfoFromSignUp } from "../actions/userAction";

function mapStateToProps(state) {
    return { user: state.user };
}

export const signInWithGoogle = async (
    onClose,
    history,
    updateInfo,
    setIndex,
    setOpacity,
    updateInfoFromSignUp
) => {
    setIndex(1);
    setOpacity(90);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    getFirebase()
        .auth()
        .signInWithPopup(googleProvider)
        .then(async (result) => {
            const uuid = result.user.uid;
            const exists = await checkUserExists({ uuid: uuid });
            console.log(exists);
            if (exists.data[0] === false) {
                const firstName = result.additionalUserInfo.profile.given_name;
                var lastName =
                    result.additionalUserInfo.profile.family_name || "";
                createAccount({
                    uuid: uuid,
                    firstName,
                    lastName,
                    email: result.additionalUserInfo.profile.email,
                }).then(() => {
                    onClose();
                    console.log("going to signup form google");
                    history.push("/signup", {
                        fromSignUp: true,
                        firstName,
                        lastName,
                    });
                });
                console.log("Created account", uuid);
            } else {
                console.log("Account exists");
                console.log(uuid, exists.data[1]);
                if (exists.data[1].status === "incomplete") {
                    updateInfoFromSignUp({
                        uuid,
                        firstName: exists.data[1].firstName,
                        lastName: exists.data[1].lastName,
                        email: exists.data[1].email,
                        status: exists.data[1].status,
                    });
                    onClose();
                    history.push("/signup", {
                        fromSignUp: false,
                        firstName: exists.data[1].firstName,
                        lastName: exists.data[1].lastName,
                    });
                } else {
                    const user_uid = await getUID({ uuid: uuid });
                    const userInfo = await getFirebase()
                        .firestore()
                        .collection("users")
                        .doc(user_uid.data.uid)
                        .get();
                    updateInfo(
                        uuid,
                        user_uid.data.uid,
                        exists.data[1],
                        userInfo.data()
                    );
                    onClose();
                    history.push(`/users/${user_uid.data.uid}`);
                }
            }
        })
        .catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.log(email, credential, errorCode, errorMessage);
            // ...
        });
};

const SignIn = React.memo((props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [svgIndex, setIndex] = useState(-1);
    const [svgOpacity, setOpacity] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        getFirebase()
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (user) => {
                setIndex(1);
                setOpacity(90);
                const uuid = user.user.uid;

                const exists = await checkUserExists({ uuid: uuid });
                console.log(exists);
                if (exists.data[1].status === "incomplete") {
                    props.onClose();
                    history.push("/signup", {
                        fromSignUp: false,
                        firstName: exists.data[1].firstName,
                        lastName: exists.data[1].lastName,
                    });
                } else {
                    const user_uid = await getUID({ uuid: uuid });
                    const userInfo = await getFirebase()
                        .firestore()
                        .collection("users")
                        .doc(user_uid.data.uid)
                        .get();
                    console.log(user_uid.data.uid);
                    console.log(userInfo.data());
                    updateInfo(
                        uuid,
                        user_uid.data.uid,
                        exists.data[1],
                        userInfo.data()
                    );
                    props.onClose();
                    console.log(props.user);
                    // history.push(`/users/${userInfo.data().uid}`);
                }
                console.log(" signed in ", user);
            })
            .catch((e) => {
                if (e.code === "auth/wrong-password") {
                    setErrormsg("Invalid email or password. Please try again.");
                } else if (e.code === "auth/user-not-found") {
                    setErrormsg(
                        "This account doesn't exist. Please sign up instead."
                    );
                } else {
                    alert("something wrong happened");
                    console.log(e);
                }
            });
    };
    const history = useHistory();

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            style={{ overflow: "hidden" }}
        >
            <Loader
                loadMessage="Signing you in"
                style={{
                    position: "absolute",
                    backgroundColor: "white",
                    opacity: `${svgOpacity}%`,
                    zIndex: `${svgIndex}`,
                    padding: "120px 70px",
                }}
            />

            <i className="fas fa-times" onClick={props.onClose} />
            <h2 style={{ margin: "0 0 12px 0" }}>Sign In</h2>
            <input
                className="inp-text"
                placeholder="&#xf0e0;   Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="inp-text"
                placeholder="&#xf070;   Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <a
                className="small-text"
                href="http://www.google.com"
                style={{ textAlign: "right", width: "250px" }}
            >
                Forgot password?
            </a>
            {errormsg && <p className="error">{errormsg}</p>}
            <input
                className="pink login button"
                id="login"
                type="submit"
                value="Login"
            />
            <span className="divider">
                <hr style={{ width: "100px" }} />
                <span className="small-text">or</span>
                <hr style={{ width: "100px" }} />
            </span>
            <Button
                type="button"
                iconL={<i className="fab fa-google-plus-g" />}
                id="google"
                text="Sign in with Google"
                onClick={() => {
                    signInWithGoogle(
                        props.onClose,
                        history,
                        props.updateInfo,
                        setIndex,
                        setOpacity,
                        props.updateInfoFromSignUp
                    );
                }}
            />
            <span className="small-text">
                Don't have an account?{" "}
                <Link
                    className="link"
                    to="/"
                    onClick={() => props.toSignUp()}
                    style={{ textAlign: "right" }}
                >
                    Create one.
                </Link>
            </span>
        </form>
    );
});
export default connect(mapStateToProps, { updateInfo, updateInfoFromSignUp })(
    SignIn
);
