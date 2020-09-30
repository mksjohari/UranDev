import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './sandbox/Button';
import '../modules/loginform.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { getFirebase } from './firebase/firebase';

export const signInWithGoogle = async (firebase) => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	getFirebase()
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

const SignIn = React.memo((props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Submitting Form ${email + password}`);
	};
	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<i className="fas fa-times" onClick={props.onClose} />
			<h2 style={{ margin: '0 0 12px 0' }}>Sign In</h2>
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
				style={{ textAlign: 'right', width: '250px' }}
			>
				Forgot password?
			</a>
			<input
				className="pink login button"
				id="login"
				type="submit"
				value="Login"
			/>
			<span className="divider">
				<hr style={{ width: '100px' }} />
				<text className="small-text">or</text>
				<hr style={{ width: '100px' }} />
			</span>
			<Button
				type="button"
				iconL={<i className="fab fa-google-plus-g" />}
				id="google"
				text="Sign in with Google"
				onClick={() => {
					signInWithGoogle(firebase);
				}}
			/>
			<text className="small-text">
				Don't have an account?{' '}
				<Link
					className="link"
					to="/"
					onClick={() => props.toSignUp()}
					style={{ textAlign: 'right' }}
				>
					Create one.
				</Link>
			</text>
		</form>
	);
});

export default SignIn;
