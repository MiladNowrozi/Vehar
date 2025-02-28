import { Link } from "react-router-dom";

import "./navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
//  fa language
const fa1 = "به پنل ادمین خوش آمدید !";
const fa2 = "سلام ";
const fa3 = "امنیت ";
const fa4 = "خروج ";
//

export const Toggle = () => {
	const add = document.getElementById("milad");
	const OpenMenu = document.getElementById("menu-lord");
	add.classList.toggle("milad");
	if (OpenMenu.style.right === "-50%") {
		OpenMenu.style.right = "0%";
	} else {
		OpenMenu.style.right = "-50%";
	}
};

export const NavbarAdmin = () => {
	const { CurrentUser, logout } = useContext(AuthContext);
	const [OpenProfileAdmin, setOpenProfileAdmin] = useState(false);
	const ToggleProfileAdmin = () => {
		OpenProfileAdmin === false ? setOpenProfileAdmin(true) : setOpenProfileAdmin(false);
	};
	return (
		<div className="admin-navbar-page">
			<div className="messages-admin">
				<i className="fas fa-comment-alt" aria-hidden="true"></i>
				<div id="milad" onClick={Toggle} className="open-menu-admin">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div className="welcome-navbar-admin">
				<h1>{fa1}</h1>
			</div>
			<div
				id="login-admin"
				onClick={ToggleProfileAdmin}
				onMouseOver={() => setOpenProfileAdmin(true)}
				onMouseOut={() => setOpenProfileAdmin(false)}
				className="login-admin"
			>
				<i className="fa fa-user-circle" aria-hidden="true"></i>
				{OpenProfileAdmin === true && (
					<div className="Show-LoginProfile-Lord">
						<h3>{CurrentUser && fa2 + CurrentUser.Info.FirstName + " !"}</h3>
						<Link to={"/"}>
							{fa3}
							<i className="fas fa-user-lock"></i>
						</Link>
						<Link onClick={logout} to={"/login-register"}>
							{fa4}
							<i className="fa fa-sign-out"></i>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
