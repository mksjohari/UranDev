import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import Button from './sandbox/Button';
import PasswordStrengthMeter from '../shared/sandbox/PasswordStrengthMeter';
import '../modules/loginform.scss';
import Loader from './Loader';

import { getFirebase } from './firebase/config';
import { signInWithGoogle } from './signInForm';
import { checkUserExists, createAccount } from './firebase/firebase';
import { updateInfo, updateInfoFromSignUp } from '../actions/userAction';

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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [errormsg, setErrormsg] = useState('');
	const [svgIndex, setIndex] = useState(-1);
	const [svgOpacity, setOpacity] = useState(0);
	let history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		setIndex(1);
		setOpacity(90);
		if (password.length < 8) {
			setErrormsg('Password must be at least 8 characters');
		} else if (password === confirmPass) {
			getFirebase()
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(async (user) => {
					const exists = await checkUserExists(user.user.uid);
					const uuid = user.user.uid;
					if (exists.data[0] === false) {
						createAccount({
							uuid: uuid,
							firstName,
							lastName,
							email,
						}).then(() => {
							props.updateInfoFromSignUp({
								uuid,
								firstName,
								lastName,
								email,
							});
							props.onClose();
							history.push('/signup', {
								fromSignUp: true,
								firstName,
								lastName,
							});
						});
						console.log('Created account', uuid);
					} else {
						console.log('Account already exists');
					}
				})
				.catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode === 'auth/email-already-in-use') {
						console.log(errorMessage);
						setErrormsg(
							'This email address is already in use. Please log in instead.'
						);
					} else {
						console.log(error);
					}
					// ...
				});
		} else {
			setErrormsg("The passwords don't match. Try again.");
		}
	};
	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<Loader
				loadMessage="Creating your account"
				style={{
					position: 'absolute',
					backgroundColor: 'white',
					opacity: `${svgOpacity}%`,
					zIndex: `${svgIndex}`,
					padding: '210px 50px',
				}}
			/>

			<i className="fas fa-times" onClick={props.onClose} />
			<h2 style={{ margin: '0 0 12px 0' }}>Sign Up</h2>
			<input
				className="inp-text"
				placeholder="First Name"
				type="text"
				onChange={(e) => setFirstName(e.target.value)}
				required
			/>
			<input
				className="inp-text"
				placeholder="Last Name"
				type="text"
				onChange={(e) => setLastName(e.target.value)}
				required
			/>
			<input
				className="inp-text"
				placeholder="&#xf0e0;   Email"
				type="text"
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<span className="divider">
				<hr style={{ width: '100%' }} />
			</span>
			<input
				className={!errormsg ? 'inp-text' : 'inp-text inp_error'}
				placeholder="&#xf070;   Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<input
				className="inp-text"
				placeholder="&#xf070;   Confirm Password"
				type="password"
				onChange={(e) => setConfirmPass(e.target.value)}
				required
			/>
			<PasswordStrengthMeter password={password} />
			{errormsg && <p className="error">{errormsg}</p>}
			<input
				className="pink login button"
				id="login"
				type="submit"
				value="Create account"
			/>
			<span className="divider">
				<hr style={{ width: '100px' }} />
				<span className="small-text">or</span>
				<hr style={{ width: '100px' }} />
			</span>
			<Button
				type="button"
				iconL={<i className="fab fa-google-plus-g" />}
				id="google"
				text="Sign up with Google"
				onClick={() => {
					signInWithGoogle(
						props.onClose,
						history,
						props.updateInfo,
						setIndex,
						setOpacity
					);
				}}
			/>
			<span className="small-text">
				Already have an account?{' '}
				<Link
					className="link"
					to="/"
					onClick={() => props.toSignIn()}
					style={{ textAlign: 'right' }}
				>
					Sign in.
				</Link>
			</span>
		</form>
	);
});

export default connect(null, { updateInfo, updateInfoFromSignUp })(SignUp);
