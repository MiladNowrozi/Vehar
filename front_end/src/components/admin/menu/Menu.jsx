import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { AnimationYellow } from "../../../animations/Animation";
import { AuthContext } from "../../../context/authContext";
import { Toggle } from "../navbar/Navbar";
export const MenuLord = () => {
	const { CurrentUser } = useContext(AuthContext);
	return (
		<section id="menu-lord" className="menu-lord" style={{ right: window.innerWidth < 500 ? "-50%" : "0%" }}>
			<Link onClick={window.innerWidth < 500 && Toggle} to={"/"}>
				<div className="navbar-menu-lord">
					<section className="animation">
						<span className="logo-site"></span>
						<span className="animate">
							<AnimationYellow />
						</span>
					</section>
					<h1>پایگاه خبری</h1>
				</div>
			</Link>
			<div className="header-menu-lord">
				<Link onClick={window.innerWidth < 500 && Toggle} to={"/admin"}>
					<button>
						<i className="fas fa-user"></i>پروفایل شخصی
					</button>
				</Link>
				{CurrentUser.Info.Role === "Lord" && (
					<Link onClick={window.innerWidth < 500 && Toggle} to={"list-lords"}>
						<button>
							<i className="fas fa-user-friends"></i>نویسندگان
						</button>
					</Link>
				)}
				{CurrentUser.Info.Role === "Lord" && (
					<Link onClick={window.innerWidth < 500 && Toggle} to={"list-users"}>
						<button>
							<i className="fas fa-users"></i>کاربران
						</button>
					</Link>
				)}
				<Link onClick={window.innerWidth < 500 && Toggle} to={"create-news"}>
					<button>
						<i className="fas fa-newspaper"></i>ایجاد خبر
					</button>
				</Link>
				<Link onClick={window.innerWidth < 500 && Toggle} to={"news"}>
					<button>
						<i className="fas fa-newspaper"></i>اخبار
					</button>
				</Link>
				{CurrentUser.Info.Role === "Lord" && (
					<Link onClick={window.innerWidth < 500 && Toggle} to={"history"}>
						<button>
							<i className="fas fa-history"></i>خبر های اخیر
						</button>
					</Link>
				)}
			</div>
		</section>
	);
};
