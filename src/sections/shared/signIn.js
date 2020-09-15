import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from "gatsby";
import { Button } from "@material-ui/core";
import styles from "../../modules/signIn.module.scss";
import { getFirebase } from "../../firebase";
export const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
    console.log("Sign in");
    getFirebase(firebase)
        .auth()
        .signInWithPopup(googleProvider)
        .then(function (result) {
            console.log(result);
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

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error] = useState(null);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        console.log(event, email, password);
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };
    console.log(getFirebase(firebase).auth().currentUser);
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1>Sign In</h1>
                {error !== null && <div>{error}</div>}
                <form>
                    <label className={styles.label} htmlFor="userEmail">
                        Email:
                    </label>
                    <br />

                    <input
                        type="email"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: uran@gmail.com"
                        id="userEmail"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <br />
                    <label className={styles.label} htmlFor="userPassword">
                        Password:
                    </label>
                    <br />

                    <input
                        type="password"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <br />
                    <Button
                        style={{ marginTop: 10 }}
                        color="primary"
                        variant="contained"
                        onClick={(event) => {
                            signInWithEmailAndPasswordHandler(
                                event,
                                email,
                                password
                            );
                        }}
                    >
                        Sign in
                    </Button>
                </form>
                <p className="text-center my-3">
                    Don't have an account? <Link to="/">Sign up here</Link>{" "}
                    <br /> <Link to="/">Forgot Password?</Link>
                </p>
                <hr />
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        console.log("hello");
                        signInWithGoogle();
                    }}
                >
                    Sign in with Google
                </Button>
                {"   "}
                <Button
                    color="default"
                    variant="contained"
                    onClick={() => {
                        console.log(getFirebase(firebase).auth().currentUser);
                    }}
                >
                    Test Log
                </Button>
            </div>
        </div>
    );
};
export default SignIn;
