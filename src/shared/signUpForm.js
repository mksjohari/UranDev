import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./sandbox/Button";
import PasswordStrengthMeter from "../shared/sandbox/PasswordStrengthMeter";
import "../modules/loginform.scss";

import { getFirebase } from "./firebase/config";
import { signInWithGoogle } from "./signInForm";
import { checkUserExists, createAccount } from "./firebase/firebase";

// const sendVerification = () => {
//     const user = getFirebase().auth().currentUser;
//     user.sendEmailVerification()
//         .then(() => {
//             console.log("Verification Email Sent");
//         })
//         .catch((err) => {
//             console.log("Error Occured");
//             console.log(err);
//         });
// };

const SignUp = React.memo((props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [errormsg, setErrormsg] = useState("");
	let history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password.length < 8) {
			setErrormsg("Password must be at least 8 characters");
		} else if (password === confirmPass) {
			getFirebase()
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(async (user) => {
					const exists = await checkUserExists(user.user.uid);
					if (exists.data[0] === false) {
						await createAccount({
							uid: user.user.uid,
							firstName: firstName,
							lastName: lastName,
							email: email,
						});
						console.log("Created account", user.user.uid);
					} else {
						console.log("Account exists");
					}
					props.onClose();
					history.push("/signup", {
						fromSignUp: true,
						firstName,
						lastName,
					});
				})
				.catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode === "auth/email-already-in-use") {
						console.log(errorMessage);
						setErrormsg(
							"This email address is already in use. Please log in instead."
						);
					}
					// ...
				});
		} else {
			setErrormsg("The passwords don't match. Try again.");
		}
	};
	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<i className='fas fa-times' onClick={props.onClose} />
			<h2 style={{ margin: "0 0 12px 0" }}>Sign Up</h2>
			<input
				className='inp-text'
				placeholder='First Name'
				type='text'
				onChange={(e) => setFirstName(e.target.value)}
				required
			/>
			<input
				className='inp-text'
				placeholder='Last Name'
				type='text'
				onChange={(e) => setLastName(e.target.value)}
				required
			/>
			<input
				className='inp-text'
				placeholder='&#xf0e0;   Email'
				type='text'
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<span className='divider'>
				<hr style={{ width: "100%" }} />
			</span>
			<input
				className={!errormsg ? "inp-text" : "inp-text inp_error"}
				placeholder='&#xf070;   Password'
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<input
				className='inp-text'
				placeholder='&#xf070;   Confirm Password'
				type='password'
				onChange={(e) => setConfirmPass(e.target.value)}
				required
			/>
			<PasswordStrengthMeter password={password} />
			{errormsg && <p className='error'>{errormsg}</p>}
			<input
				className='pink login button'
				id='login'
				type='submit'
				value='Create account'
			/>
			<span className='divider'>
				<hr style={{ width: "100px" }} />
				<span className='small-text'>or</span>
				<hr style={{ width: "100px" }} />
			</span>
			<Button
				type='button'
				iconL={<i className='fab fa-google-plus-g' />}
				id='google'
				text='Sign up with Google'
				onClick={() => {
					signInWithGoogle(props.onClose, history);
				}}
			/>
			<span className='small-text'>
				Already have an account?{" "}
				<Link
					className='link'
					to='/'
					onClick={() => props.toSignIn()}
					style={{ textAlign: "right" }}
				>
					Sign in.
				</Link>
			</span>
		</form>
	);
});

export default SignUp;