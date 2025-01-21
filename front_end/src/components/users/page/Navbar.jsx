import { useContext } from "react";
import { Link } from "react-router-dom";
//
import { AuthContext } from "../../../context/authContext";
//
import "../user/user.css";
//
export const Navbar = () => {
	const { CurrentUser, logout } = useContext(AuthContext);
	return (
		<div className="container-nav">
			<div className="content-nav">
				<div className="login-logout">
					{CurrentUser?.Info.Role === "User" ? (
						<div className="logout-icon">
							<i className="fas fa-user-check"></i>
							<div className="content-logout">
								<div className="content-info-user">
									{CurrentUser.Info.Img === null ? <i className="fas fa-user-circle"></i> : <img src={CurrentUser.Info.Img} alt="img-user" />}
									<span>سلام {CurrentUser.Info.FirstName} !</span>
								</div>
								<Link type="button" to={"/user"} className="Link-home">
									<i className="fa fa-home"></i>صفحه من
								</Link>
								<Link type="button" onClick={logout} className="link-logout">
									<i className="fa fa-sign-out"></i>خروج
								</Link>
							</div>
						</div>
					) : (
						<div className="login-icon">
							<Link className="options-navbar" to={"/login-register"}>
								<i className="fa fa-sign-in"></i>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
