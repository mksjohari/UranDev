import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from './sandbox/Button';
import Loader from './Loader';
import { getFirebase } from './firebase/config';
import {
	checkUserExists,
	createAccount,
	getUserSocials,
	getUserExpertise,
	getUserInfo,
} from './firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import '../modules/loginform.scss';
import { updateInfo } from '../actions/userAction';

export const signInWithGoogle = async (
	onClose,
	history,
	updateInfo,
	setIndex,
	setOpacity
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
					result.additionalUserInfo.profile.family_name || '';
				console.log(
					'si',
					firstName,
					lastName,
					result.additionalUserInfo.profile.email
				);
				createAccount({
					uuid: uuid,
					firstName,
					lastName,
					email: result.additionalUserInfo.profile.email,
				}).then(() => {
					onClose();
					console.log('going to signup form google');
					history.push('/signup', {
						fromSignUp: true,
						firstName,
						lastName,
					});
				});
				console.log('Created account', uuid);
			} else {
				console.log('Account exists');
				console.log(uuid);
				if (exists.data[1].status === 'incomplete') {
					onClose();
					history.push('/signup', {
						fromSignUp: false,
						firstName: exists.data[1].firstName,
						lastName: exists.data[1].lastName,
					});
				} else {
					const userInfo = await getUserInfo({ uuid: uuid });
					const userSocials = await getUserSocials({ uuid: uuid });
					const userExpertise = await getUserExpertise({
						uuid: uuid,
					});
					console.log(userSocials);
					console.log('sir');
					updateInfo({
						userInfo: userInfo.data,
						userSocials: userSocials.data,
						userExpertise: userExpertise.data,
					});
					onClose();
					history.push(`/users/${userInfo.data.uid}`);
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errormsg, setErrormsg] = useState('');
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
				const exists = await checkUserExists({ uuid: user.user.uid });
				console.log(exists);
				if (exists.data[1].status === 'incomplete') {
					props.onClose();
					history.push('/signup', {
						fromSignUp: false,
						firstName: exists.data[1].firstName,
						lastName: exists.data[1].lastName,
					});
				} else {
					const userInfo = await getUserInfo({ uuid: user.user.uid });
					const userSocials = await getUserSocials({
						uuid: user.user.uid,
					});
					const userExpertise = await getUserExpertise({
						uuid: user.user.uid,
					});
					props.updateInfo({
						userInfo: userInfo.data,
						userSocials: userSocials.data,
						userExpertise: userExpertise.data,
					});
					props.onClose();
					history.push(`/users/${userInfo.data.uid}`);
				}
				console.log(' signed in ', user);
			})
			.catch((e) => {
				if (e.code === 'auth/wrong-password') {
					setErrormsg('Invalid email or password. Please try again.');
				} else if (e.code === 'auth/user-not-found') {
					setErrormsg(
						"This account doesn't exist. Please sign up instead."
					);
				} else {
					alert('something wrong happened');
					console.log(e);
				}
			});
	};
	const history = useHistory();

	return (
		<form
			className="login-form"
			onSubmit={handleSubmit}
			style={{ overflow: 'hidden' }}
		>
			<Loader
				loadMessage="Signing you in"
				style={{
					position: 'absolute',
					backgroundColor: 'white',
					opacity: `${svgOpacity}%`,
					zIndex: `${svgIndex}`,
					padding: '120px 70px',
				}}
			/>

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
			{errormsg && <p className="error">{errormsg}</p>}
			<input
				className="pink login button"
				id="login"
				type="submit"
				value="Login"
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
				text="Sign in with Google"
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
				Don't have an account?{' '}
				<Link
					className="link"
					to="/"
					onClick={() => props.toSignUp()}
					style={{ textAlign: 'right' }}
				>
					Create one.
				</Link>
			</span>
		</form>
	);
});

export default connect(null, { updateInfo })(SignIn);
