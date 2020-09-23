import React, { useState } from "react";
import Button from "./Button";
import "./loginform.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting Form ${email + password}`);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <i class="fas fa-times" onClick={props.onClick} />
      <h2 style={{ margin: "0 0 12px 0" }}>Sign in</h2>
      <input
        className="inp-text"
        placeholder="Email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="inp-text"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <a
        href="http://www.google.com"
        style={{ textAlign: "right", width: "250px" }}
      >
        Forgot password?
      </a>
      <input className="pink button" id="login" type="submit" value="Login" />
      <Button
        type="button"
        iconL={<i className="fab fa-google-plus-g" />}
        id="google"
        text="Sign in with Google"
      />
    </form>
  );
}

export default Login;
