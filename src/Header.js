import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import {
	BusinessCenter,
	Chat,
	Home,
	Notifications,
	SupervisorAccount,
} from "@material-ui/icons";
import HeaderOption from "./HeaderOption";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
import { auth } from "./firebase";

function Header() {
	const dispatch = useDispatch();

	const logoutOfApp = () => {
		auth.signOut();
		dispatch(logout());
	};

	return (
		<div className="header">
			<div className="header__left">
				<img
					src="https://image.flaticon.com/icons/png/512/174/174857.png"
					alt=""
				/>
				<div className="header__search">
					<SearchIcon />
					<input type="text" />
				</div>
			</div>
			<div className="header__right">
				<HeaderOption title="Home" Icon={Home} />
				<HeaderOption title="My Network" Icon={SupervisorAccount} />
				<HeaderOption title="Jobs" Icon={BusinessCenter} />
				<HeaderOption title="Messaging" Icon={Chat} />
				<HeaderOption title="Notifications" Icon={Notifications} />
				<HeaderOption
					avatar="https://avatars.githubusercontent.com/u/47697586?s=60&v=4"
					logoutHandler={logoutOfApp}
				/>
			</div>
		</div>
	);
}

export default Header;
