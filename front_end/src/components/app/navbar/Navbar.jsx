import { useContext, useEffect, useState } from "react";
import { AnimationYellow } from "../../../animations/Animation";
import { MenuHamburger } from "../header/pageMenu/PageMenu";
import { AuthContext } from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";
import { AxiosInstance } from "../../../axiosInstance";
//
const Navbar = () => {
	const LiveDate = () => {
		const [dateTime, setDateTime] = useState(new Date());
		const [currentDay, setCurrentDay] = useState("");
		useEffect(() => {
			const intervalId = setInterval(() => {
				const now = new Date();
				// تنظیم زمان به وقت ایران (UTC+3:30)
				const iranTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tehran" }));
				setDateTime(iranTime);
			}, 1000); // هر ثانیه بروزرسانی می‌شود
			const updateDay = () => {
				const now = new Date();
				// دریافت روز هفته به زبان فارسی
				const options = { weekday: "long", timeZone: "Asia/Tehran" };
				setCurrentDay(now.toLocaleDateString("fa-IR", options));
			};
			updateDay(); // بروزرسانی اولیه
			const intervalI = setInterval(updateDay, 1000 * 60 * 60); // هر ساعت بروزرسانی می‌شود
			return () => clearInterval(intervalId, intervalI); // پاک کردن interval هنگام Unmount
		}, []);

		return (
			<div className="full-time">
				<p>{currentDay.toLocaleString("fa-IR")}</p>
				<p>{dateTime.toLocaleDateString("fa-IR")}</p>
				<p>{" - ساعت: " + dateTime.toLocaleTimeString("fa-IR")}</p>
			</div>
		);
	};

	//
	const navigate = useNavigate();
	const [SearchNav, setSearchNav] = useState(false);
	const { CurrentUser, logout } = useContext(AuthContext);
	//
	const [ReceiveAllNews, setReceiveAllNews] = useState({
		News: [],
		Limit: 10,
		CurrentPage: 1,
		TotalNews: null,
		TotalPages: null,
		Search: null,
		SearchById: null,
	});

	const HashSearch = async () => {
		await AxiosInstance({
			method: "get",
			url: `news/search-user?currentpage=${ReceiveAllNews.CurrentPage}&limit=${ReceiveAllNews.Limit}&search=${ReceiveAllNews.Search}&searchbyid=${ReceiveAllNews.SearchById}`,
			withCredentials: true,
		})
			.then((success) => {
				setReceiveAllNews((prev) => ({
					...prev,
					News: success.data.body.News,
					TotalPages: success.data.body.TotalPages,
					TotalNews: success.data.body.TotalNews,
					CurrentPage: success.data.body.CurrentPage,
				}));
				if (success.data.body.TotalPages <= 1) {
					document.getElementById("pagination").style.display = "none";
				} else {
					document.getElementById("pagination").style.display = "flex";
					document.getElementById("Back").disabled = false;
					document.getElementById("ForWord").disabled = false;
					if (success.data.body.CurrentPage === success.data.body.TotalPages) {
						document.getElementById("ForWord").disabled = true;
						document.getElementById("Back").disabled = false;
					} else if (success.data.body.CurrentPage === 1) {
						document.getElementById("Back").disabled = true;
						document.getElementById("ForWord").disabled = false;
					}
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="NavbarContainer">
			<div className="formContent">
				<div className="login-logout">
					{CurrentUser ? (
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
				<div className="input-search-home-page">
					<button onClick={() => (SearchNav ? setSearchNav(false) : setSearchNav(true))} className="searchSvg" type="submit">
						<i id="SearchNavbar" className="fa fa-search" aria-hidden="true"></i>
					</button>
					{SearchNav && (
						<div className="recommend-container">
							<div className="content-recommend">
								<div className="inputs">
									<input
										id="search-text"
										onChange={(e) => {
											HashSearch((ReceiveAllNews.Search = e.target.value));
										}}
										type="search"
										placeholder=" جستجو با متن خبر"
										autoComplete="off"
									/>
									<input
										id="search-number"
										onChange={(e) => HashSearch((ReceiveAllNews.SearchById = e.target.value))}
										type="number"
										placeholder="جستجو با کد خبر"
										autoComplete="off"
									/>
									<i
										className="fa fa-arrow-left"
										onClick={() => {
											setSearchNav(false);
											HashSearch((ReceiveAllNews.Search = null));
										}}
									></i>
								</div>
								<div className="content-result-search">
									{ReceiveAllNews.News.map((e, i) => {
										const [DateC, TimeC] = [
											{
												DateCreate: new Date(e.createdAt)
													.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })
													.split("T")[0],
											},
											{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
										];
										return (
											<div
												key={i}
												onClick={() => {
													HashSearch((ReceiveAllNews.Search = null));
													setSearchNav(false);
													navigate(`/news/${e.id}`);
												}}
												className="container-map-search"
											>
												<div className="content-map-search">
													<div className="text-title-and-titre">
														<img src={e.Default_Image} alt="img" />
														<div className="titre-news-search">
															<p dangerouslySetInnerHTML={{ __html: e.News_Titre }}></p>
														</div>
														<div className="title-news-search">
															<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
														</div>
													</div>
													<div className="info-news-search">
														<p>نویسنده: {e.Author}</p>
														<p>انتشار: {DateC.DateCreate}</p>
														<p>
															دسته:
															{(e.Category === "politic" && " سیاست") ||
																(e.Category === "economy" && " اقتصاد") ||
																(e.Category === "social" && " جامعه") ||
																(e.Category === "sport" && " ورزش") ||
																(e.Category === "local" && " بومی")}
														</p>
														<p> کد خبر: {e.id}</p>
													</div>
												</div>
											</div>
										);
									})}
									<div style={{ display: "none" }} id="pagination" className="pagination">
										<button
											id="Back"
											onClick={() => {
												ReceiveAllNews.CurrentPage--;
												HashSearch();
											}}
										>
											قبلی
										</button>
										<span>
											{ReceiveAllNews.CurrentPage} از {Math.ceil(ReceiveAllNews.TotalPages)}
										</span>
										<button
											id="ForWord"
											onClick={() => {
												ReceiveAllNews.CurrentPage++;
												HashSearch();
											}}
										>
											بعدی
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<MenuHamburger />
			</div>
			<div className="SloganVehar">
				{LiveDate()}
				<div className="Slogan">
					<span style={{ color: "#fff" }}>سیاسی هستیم</span> جناحی نیستیم
				</div>
			</div>
			<div className="NavbarMenuText defNavbarMenuText">
				<div onClick={() => (window.location.href = "/")} className="Logo NavbarLogo defaultNavbarLogo">
					<div className="DefaultLogoGreen animation-logo-green">
						<AnimationYellow />
					</div>
				</div>
				<div className="options-select">
					<Link className="options-navbar" to="/contact-us">
						<h6>ارتباط با ما</h6>
					</Link>
					<Link className="options-navbar" to="/about">
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
		</div>
	);
};

export default Navbar;
