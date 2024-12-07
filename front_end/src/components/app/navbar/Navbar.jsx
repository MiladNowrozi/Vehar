import { useContext } from "react";
import AnimationGreen, { AnimationYellow } from "../../../animations/Animation";
import { MenuHamburger } from "../header/pageMenu/PageMenu";
import { AuthContext } from "../../../context/authContext";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
	const { CurrentUser, logout } = useContext(AuthContext);
	return (
		<div className="NavbarContainer">
			<div className="login-logout">
				{!CurrentUser ? (
					<div className="login-icon">
						<Link className="options-navbar" to={"/login-register"}>
							<i className="fa fa-sign-in"></i>
						</Link>
					</div>
				) : (
					<div className="logout-icon">
						<i className="fas fa-user-check"></i>
						<div className="content-logout">
							<span className="img-user">
								{CurrentUser.User_Img === null ? (
									<i className="fas fa-user-circle"></i>
								) : (
									<img className="img" src={CurrentUser.User_Img} alt="img-user" />
								)}
							</span>
							<span className="firstName-user">{CurrentUser.User_FirstName + " " + CurrentUser.User_LastName}</span>
							<button type="button" onClick={logout} className="btn-logout">
								<i className="fa fa-sign-out"></i>خروج
							</button>
						</div>
					</div>
				)}
			</div>
			<div className="NavbarMenuText defNavbarMenuText">
				<div onClick={() => (window.location.href = "/")} className="Logo NavbarLogo defaultNavbarLogo">
					<div className="DefaultLogoGreen animation-logo-green">
						<AnimationGreen />
					</div>
					<div className="DefaultLogoYellow animation-logo-yellow">
						<AnimationYellow />
					</div>
				</div>
				<div className="options-select">
					<Link className="options-navbar" to="/?cat=ContactUs">
						<h6>ارتباط با ما</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=about">
						<h6>درباره ما</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=sport">
						<h6>ورزش</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=economy">
						<h6>اقتصاد</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=local">
						<h6>بومی</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=social">
						<h6>جامعه</h6>
					</Link>
					<Link className="options-navbar" to="/?cat=politic">
						<h6>سیاست</h6>
					</Link>
					<Link className="options-navbar" to="/">
						<h6>صفحه اصلی</h6>
					</Link>
				</div>
			</div>
			<div className="formContent">
				<div className="SloganVehar">
					<p>
						<span style={{ color: "red" }}>سیاسی هستیم</span> جناحی نیستیم
					</p>
				</div>
				<MenuHamburger />
				<div className="input-search-home-page">
					<form action="/">
						<button className="searchSvg" type="submit">
							<span>
								<i className="fa fa-search" aria-hidden="true"></i>
							</span>
						</button>
						<input type="search" placeholder="... جستجو" name="search" autoComplete="off" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
