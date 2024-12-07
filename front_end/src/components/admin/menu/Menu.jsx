import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { AnimationYellow } from "../../../animations/Animation";

export const MenuLord = ({ onAction }) => {
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
				<Link to={"/lord"}>
					<button>
						<i className="fas fa-user"></i>پروفایل شخصی
					</button>
				</Link>
				<Link to={"list-lords"}>
					<button>
						<i className="fas fa-user-friends"></i>نویسندگان
					</button>
				</Link>
				<Link to={"list-users"}>
					<button>
						<i className="fas fa-users"></i>کاربران
					</button>
				</Link>
				<Link to={"create-news"}>
					<button>
						<i className="fas fa-newspaper"></i>ایجاد خبر
					</button>
				</Link>
				<Link to={"news"}>
					<button onClick={onAction}>
						<i className="fas fa-newspaper"></i>اخبار
					</button>
				</Link>
				<Link to={"list-users"}>
					<button>
						<i className="fas fa-envelope"></i>ایمیل های دریافتی
					</button>
				</Link>
				<Link to={"list-users"}>
					<button>
						<i className="fas fa-cog"></i>تنظیمات پایگاه وهار
					</button>
				</Link>
			</div>
		</section>
	);
};

export const MenuAuthor = () => {
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
				<Link to={"/author"}>
					<button>
						<i className="fas fa-user"></i>پروفایل
					</button>
				</Link>
				<Link to={"create-news"}>
					<button>
						<i className="fas fa-newspaper"></i>ایجاد خبر
					</button>
				</Link>
				<Link to={"create-news"}>
					<button>
						<i className="fas fa-newspaper"></i>اخبار
					</button>
				</Link>
				<Link to={"list-users"}>
					<button>
						<i className="fas fa-envelope"></i>ایمیل کاربران
					</button>
				</Link>
			</div>
		</section>
	);
};
