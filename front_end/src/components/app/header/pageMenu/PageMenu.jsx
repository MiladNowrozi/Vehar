import { Link } from "react-router-dom";
import "./pagemenu.css";
const handleHamburger = () => {
	const changeStyleMenu = document.getElementById("ContentPageMenu");
	const Locked = document.getElementById("ContentMenu");
	if (window.innerWidth < 500) {
		if (changeStyleMenu.style.right === "-50%") {
			changeStyleMenu.style.right = "0%";
			changeStyleMenu.style.width = "100%";
			Locked.style.width = "50%";
			document.getElementById("home").style.overflow = "hidden";
		} else {
			changeStyleMenu.style.right = "-50%";
			changeStyleMenu.style.width = "50%";
			Locked.style.width = "100%";
			document.getElementById("home").style.overflow = "auto";
		}
	} else {
		if (changeStyleMenu.style.right === "-18%") {
			changeStyleMenu.style.right = "0%";
			changeStyleMenu.style.width = "100%";
			Locked.style.width = "15%";
			document.getElementById("home").style.overflow = "hidden";
		} else {
			changeStyleMenu.style.right = "-18%";
			changeStyleMenu.style.width = "15%";
			Locked.style.width = "100%";
			document.getElementById("home").style.overflow = "auto";
		}
	}
};

export const MenuHamburger = () => {
	return (
		<div>
			<div className="NavbarMenuHamburger">
				<div className="ContentMenuHamburger" onClick={handleHamburger}>
					<div className="spanMenuHam smh1"></div>
					<div className="spanMenuHam smh2"></div>
					<div className="spanMenuHam smh3"></div>
					<div className="spanMenuHam smh4"></div>
				</div>
			</div>
		</div>
	);
};

export const PageMenu = () => {
	// function offMenu() {
	// 	const GetIdOverFlow = document.querySelector("#ContentPageMenu");
	// 	const Locked = document.getElementById("ContentMenu");
	// 	if (window.innerWidth < 500) {
	// 		GetIdOverFlow.style.right = "-45%";
	// 		document.getElementById("home").style.overflow = "auto";
	// 		GetIdOverFlow.style.width = "15%";
	// 		Locked.style.width = "100%";
	// 	} else {
	// 		GetIdOverFlow.style.right = "-18%";
	// 		document.getElementById("home").style.overflow = "auto";
	// 		GetIdOverFlow.style.width = "15%";
	// 		Locked.style.width = "100%";
	// 	}
	// }
	// <i onClick={offMenu} className="fas fa-times"></i>
	// <h1>پایگاه خبری وهار</h1>
	return (
		<div id="LockAccess">
			<div id="ContentPageMenu" className="ContentPageMenu DefaultCPM" style={{ right: window.innerWidth < 500 ? "-45%" : "-18%" }}>
				<div id="ContentMenu" className="ContentMenu">
					<div className="NavMenu">
						{/*  */}
						<div class="neon-container">
							<span>پایگاه خبری</span>
							<span class="neon-text">وهار</span>
						</div>
						{/*  */}
					</div>
					<div className="ListMenuCenter" style={{ height: window.innerHeight - 105 }}>
						<div className="ListMenuNews">
							<ul>
								<Link className="Link-menu" onClick={handleHamburger} to={"/"}>
									<h1>صفحه اصلی</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to="/?catpolitic">
									<h1>سیاست</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to="/?cat=social">
									<h1>جامعه</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to="/?cat=local">
									<h1>بومی</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to="/?cat=economy">
									<h1>اقتصاد</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to="/?cat=sport">
									<h1>ورزش</h1>
								</Link>
							</ul>
						</div>
						<div className="ListMenuSite">
							<ul>
								<Link className="Link-menu" onClick={handleHamburger} to={"/about"}>
									<h1>درباره ما</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to={"/contact-us"}>
									<h1>تماس با ما</h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to={"/participation"}>
									<h1>مشارکت </h1>
								</Link>
								<Link className="Link-menu" onClick={handleHamburger} to={"/archive"}>
									<h1>آرشیو</h1>
								</Link>
							</ul>
						</div>
						<div className="SocialNetworks">
							<i className="fab fa-telegram"></i>
							<i className="fab fa-instagram" style={{ fontSize: "22px" }}></i>
							<a href="#">
								<button href="#" className="eitaa"></button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
