import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import "./Login.css";



function Login() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const dispatch = useDispatch();

	const register = (e) => {
		if (!name) {
			return alert('please enter a full name');
		}

		auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
			userAuth.user.updateProfile({
				displayName: name,
				photoURL: profilePic,
			})
				.then(() => {
					dispatch(login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: name,
						photoUrl: profilePic,
					}))
				})
		}).catch(e => alert(e));
	};

	const loginToApp = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password).then(userAuth => {
			dispatch(login({
				email: userAuth.user.email,
				uid: userAuth.user.uid,
				displayName: userAuth.user.displayName,
				profilePic: userAuth.user.photoURL,
			}))
		}).catch(e => alert(e));
		
	};
	return (
		<div className="login">
			<img
				src="https://www.cnm.edu/depts/mco/marketing/images/linkedin-logo.png/@@images/image.jpeg"
				alt=""
			/>

			<form action="">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="full name (required if registering)"
					type="text"
				/>
				<input
					value={profilePic}
					onChange={(e) => setProfilePic(e.target.value)}
					type="url"
					placeholder="profile pic url"
				/>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
				/>
				<button type="submit" onClick={loginToApp}>
					{" "}
					Sign In
				</button>
			</form>

			<p>
				Not a member
				<span className="login__register" onClick={register}>
					Register Now
				</span>
			</p>
		</div>
	);
}

export default Login;
