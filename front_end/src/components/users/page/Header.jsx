import React from "react";
import { Outlet } from "react-router-dom";
//
import { MenuUser } from "./Menu.jsx";
//
import "../user/user.css";

export const Header = () => {
	return (
		<div className="header">
			<MenuUser />
			<div className="content-header">
				<Outlet />
			</div>
		</div>
	);
};
