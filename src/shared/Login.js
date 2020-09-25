import React, { useState } from "react";
import Button from "./Button";
import ".//modules/loginform.scss";

const Login = React.memo(props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [signUp, setSignUp] = useState(false);
    const signUp = props.signUp;
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitting Form ${email + password}`);
    };
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <i className="fas fa-times" onClick={props.onClose} />
            <h2 style={{ margin: "0 0 12px 0" }}>
                {signUp ? "Sign Up" : "Sign In"}
            </h2>
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
            {!signUp && (
                <a
                    className="small-text"
                    href="http://www.google.com"
                    style={{ textAlign: "right", width: "250px" }}
                >
                    Forgot password?
                </a>
            )}
            <input
                className="pink login button"
                id="login"
                type="submit"
                value={signUp ? "Create account" : "Login"}
            />
            <span className="divider">
                <hr style={{ width: "100px" }} />
                <text className="small-text">or</text>
                <hr style={{ width: "100px" }} />
            </span>
            <Button
                type="button"
                iconL={<i className="fab fa-google-plus-g" />}
                id="google"
                text={signUp ? "Sign up with Google" : "Sign in with Google"}
            />
            {signUp ? (
                <text className="small-text">
                    Already have an account?{" "}
                    <a
                        className="link"
                        href="/"
                        onClick={() => props.toLogin}
                        style={{ textAlign: "right" }}
                    >
                        Login.
                    </a>
                </text>
            ) : (
                <text className="small-text">
                    Don't have an account?{" "}
                    <a
                        className="link"
                        href="/"
                        onClick={() => props.toSignUp}
                        style={{ textAlign: "right" }}
                    >
                        Create one.
                    </a>
                </text>
            )}
        </form>
    );
});

export default Login;
