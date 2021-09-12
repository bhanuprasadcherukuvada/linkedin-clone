import { Avatar } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import "./HeaderOption.css";
function HeaderOption({ title, Icon, avatar, logoutHandler }) {
	
	const user = useSelector(selectUser);
	return (
		<div onClick={logoutHandler} className="headerOption">
			{Icon && <Icon className="headerOption__icon" />}

			{avatar && (
				<Avatar className="headerOption__icon" src={user?.photoUrl}>
					{user.email[0]}
				</Avatar>
			)}

			{title && <h3 className="headerOption__title">{title}</h3>}
		</div>
	);
}

export default HeaderOption
