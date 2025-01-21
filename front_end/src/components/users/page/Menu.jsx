import React, { useContext } from "react";
import { Link } from "react-router-dom";
//
import { AnimationYellow } from "../../../animations/Animation";
import { AuthContext } from "../../../context/authContext";
//
import "../user/user.css";

export const MenuUser = () => {
	const { CurrentUser } = useContext(AuthContext);
	return (
		<section className="menu-user">
			<Link to={"/"}>
				<div className="navbar-menu-user">
					<section className="animation">
						<span className="logo-site"></span>
						<span className="animate">
							<AnimationYellow />
						</span>
					</section>
					<h1>پنل کاربری</h1>
				</div>
			</Link>
			<div className="header-menu-user">
				<Link to={"/user"}>
					<button>
						<i className="fas fa-user"></i>پروفایل
					</button>
				</Link>
				<Link to={"comment"}>
					<button>
						<i className="fas fa-comments"></i>نظرات من
					</button>
				</Link>
				<Link to={"likes"}>
					<button>
						<i className="fas fa-thumbs-up"></i>خبر های پسندیده
					</button>
				</Link>
				<Link to={"history"}>
					<button>
						<i className="fas fa-history"></i>سابقه فعالیت
					</button>
				</Link>
			</div>
		</section>
	);
};
