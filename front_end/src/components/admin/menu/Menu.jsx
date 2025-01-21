import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { AnimationYellow } from "../../../animations/Animation";
import { AuthContext } from "../../../context/authContext";

export const MenuLord = () => {
	const { CurrentUser } = useContext(AuthContext);
	return (
		<section className="menu-lord">
			<Link to={"/"}>
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
				<Link to={"/admin"}>
					<button>
						<i className="fas fa-user"></i>پروفایل شخصی
					</button>
				</Link>
				{CurrentUser.Info.Role === "Lord" && (
					<Link to={"list-lords"}>
						<button>
							<i className="fas fa-user-friends"></i>نویسندگان
						</button>
					</Link>
				)}
				{CurrentUser.Info.Role === "Lord" && (
					<Link to={"list-users"}>
						<button>
							<i className="fas fa-users"></i>کاربران
						</button>
					</Link>
				)}
				<Link to={"create-news"}>
					<button>
						<i className="fas fa-newspaper"></i>ایجاد خبر
					</button>
				</Link>
				<Link to={"news"}>
					<button>
						<i className="fas fa-newspaper"></i>اخبار
					</button>
				</Link>
				{CurrentUser.Info.Role === "Lord" && (
					<Link to={"history"}>
						<button>
							<i className="fas fa-history"></i>خبر های اخیر
						</button>
					</Link>
				)}
			</div>
		</section>
	);
};
