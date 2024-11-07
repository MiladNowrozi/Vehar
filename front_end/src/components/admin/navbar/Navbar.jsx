import { Link } from "react-router-dom";

import "./navbar.css";
export const NavbarAdmin = () => {
	const CurrentLord = JSON.parse(localStorage.getItem("lord"));
	return (
		<div className="admin-navbar-page">
			<div className="messages-admin">
				<i className="fas fa-comment-alt" aria-hidden="true"></i>
			</div>
			<div className="welcome-navbar-admin">
				<h1>به پنل ادمین خوش آمدید !</h1>
			</div>
			<div id="login-admin" className="login-admin">
				<i className="fa fa-user-circle" aria-hidden="true"></i>
				<div className="Show-LoginProfile-Lord">
					<h3>{`سلام ${CurrentLord && CurrentLord.Lord_FirstName} !`}</h3>
					<Link to={"/"}>
						امنیت <i className="fas fa-user-lock"></i>
					</Link>
					<Link to={"/"}>
						خروج <i className="fa fa-sign-out"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};
