import "./pagemenu.css";
export const MenuHamburger = () => {
	function handleHamburger() {
		const changeStyleMenu = document.querySelector("#ContentPageMenu");
		const Locked = document.getElementById("ContentMenu");
		if (window.innerWidth < 500) {
			if (changeStyleMenu.style.right === "-45%") {
				changeStyleMenu.style.right = "0%";
				changeStyleMenu.style.width = "100%";
				Locked.style.width = "45%";
				document.getElementById("home").style.overflow = "hidden";
			} else {
				changeStyleMenu.style.right = "-45%";
				changeStyleMenu.style.width = "45%";
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
	}

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
							<span class="neon-text">وهار</span>
							<span>پایگاه خبری</span>
						</div>
						{/*  */}
					</div>
					<div className="ListMenuCenter">
						<div className="ListMenuNews">
							<ul>
								<li>
									<a href="/">صفحه اصلی</a>
								</li>
								<li>
									<a href="/">اخبار بومی</a>
								</li>
								<li>
									<a href="/">اخبار جدید</a>
								</li>
								<li>
									<a href="/">سیاسی</a>
								</li>
								<li>
									<a href="/">اجتماعی</a>
								</li>
								<li>
									<a href="/">ورزشی</a>
								</li>
							</ul>
						</div>
						<div className="ListMenuSite">
							<ul>
								<li>
									<a href="#">درباره ما</a>
									<a href="#">تماس با ما</a>
									<a href="#">مشارکت در خبرنگاری</a>
									<a href="#">آرشیو</a>
								</li>
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
