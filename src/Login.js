import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { auth, googleProvider, githubProvider } from "./firebase";
import { Twitter } from "@material-ui/icons";
import "./Login.css";
import firebase from "firebase";
import { facebookAuthProvider, githubAuthProvider, googleAuthProvider } from "./authMethods";

function Login() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const dispatch = useDispatch();

	const socialMediaAuth = (provider) => {
		return firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => {
				return res.user;
			})
			.catch(async (error) => {
			const email = error.email;
			const pendingCred = error.credential;
 
			if (error.code === 'auth/account-exists-with-different-credential') {
				const providers = await auth.fetchSignInMethodsForEmail(email);
					
				console.log(providers[0]);
				if (providers[0] === 'password') {
					// TODO: to be handled
					console.log('password login');
				}

				const provider = getProviderForProviderId(providers[0]);

				return auth.signInWithPopup(provider).then( async result => {
					const userCred = await result.user.linkWithCredential(pendingCred);
					return userCred.user;
				})
			}
			})
	};

	const handleOnClick = async (provider) => {
		const res = await socialMediaAuth(provider);
		console.log(res);
	};

	const register = (e) => {
		if (!name) {
			return alert("please enter a full name");
		}

		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
						photoURL: profilePic,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: name,
								photoUrl: profilePic,
							})
						);
					});
			})
			.catch((e) => alert(e));
	};

	const loginToApp = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						profilePic: userAuth.user.photoURL,
					})
				);
			})
			.catch((e) => alert(e));
	};



	const getProviderForProviderId = (provider) => {
		if (provider === 'google.com') {
			return googleProvider;
		}
		else if (provider === 'github.com') {
			return githubProvider;
		}
	}

	return (
		<div className="login">
			<img
				src="https://www.cnm.edu/depts/mco/marketing/images/linkedin-logo.png/@@images/image.jpeg"
				alt=""
			/>

			<form>
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

			<button
				type="submit"
				className="login__withGoogle"
				onClick={() => handleOnClick(googleAuthProvider)}
			>
				<Twitter />
				<p>Login With Google</p>
			</button>

			<button
				type="submit"
				className="login__withGoogle"
				onClick={() => handleOnClick(githubAuthProvider)}
			>
				<Twitter />
				<p>Login With Github</p>
			</button>
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
