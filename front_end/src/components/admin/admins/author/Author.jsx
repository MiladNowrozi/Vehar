import { Outlet } from "react-router-dom";
import "./author.css";
import { MenuAuthor } from "../../menu/Menu";
import { NavbarAdmin } from "../../navbar/Navbar";

export const Author = () => {
	return (
		<div className="container-admin">
			<NavbarAdmin />
			<header className="hed-main-admin">
				<MenuAuthor />
				<Outlet />
			</header>
		</div>
	);
};
