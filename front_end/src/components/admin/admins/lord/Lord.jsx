import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../../navbar/Navbar";
import { MenuLord } from "../../menu/Menu";

import "./lord.css";

export const Lord = () => {
	return (
		<div className="container-admin">
			<NavbarAdmin />
			<header className="hed-main-admin">
				<MenuLord />
				<Outlet />
			</header>
		</div>
	);
};
