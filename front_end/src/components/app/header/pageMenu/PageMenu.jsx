import "./pagemenu.css";
export const MenuHamburger = () => {
	function handleHamburger() {
		const changeStyleMenu = document.querySelector("#ContentPageMenu");
		if (window.innerWidth < 480) {
			changeStyleMenu.style.right === "-45%" ? (changeStyleMenu.style.right = "0%") : (changeStyleMenu.style.right = "-45%");
		} else {
			changeStyleMenu.style.right === "-18%" ? (changeStyleMenu.style.right = "0%") : (changeStyleMenu.style.right = "-18%");
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
	function offMenu() {
		document.querySelector("#ContentPageMenu").style.right = window.innerWidth < 480 ? "-45%" : "-18%";
	}
	return (
		<div>
			<div id="ContentPageMenu" className="ContentPageMenu DefaultCPM" style={{ right: window.innerWidth < 480 ? "-45%" : "-18%" }}>
				<div className="ContentMenu">
					<div className="NavMenu">
						<i onClick={offMenu} className="fas fa-times"></i>
						<h1>منو دستیار</h1>
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
						<div className="ColumnCenterMenu"></div>
						<div className="ListMenuSite">
							<ul>
								<li>
									<a href="#">درباره ما</a>
									<a href="#">تماس با ما</a>
									<a href="#">مشارکت در خبرنگاری</a>
									<a href="#">آرشیو</a>
								</li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
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
