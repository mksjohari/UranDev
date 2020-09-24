import React, { useState } from 'react';
import Button from './Button';
import './/modules/loginform.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { getFirebase } from './firebase';
export const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
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

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Submitting Form ${email + password}`);
	};
	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<i className="fas fa-times" onClick={props.onClick} />
			<h2 style={{ margin: '0 0 12px 0' }}>Sign in</h2>
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
				style={{ textAlign: 'right', width: '250px' }}
			>
				Forgot password?
			</a>
			<input
				className="pink button"
				id="login"
				type="submit"
				value="Login"
			/>
			<Button
				type="button"
				iconL={<i className="fab fa-google-plus-g" />}
				id="google"
				text="Sign in with Google"
				onClick={() => {
					signInWithGoogle();
				}}
			/>
		</form>
	);
}

export default Login;
