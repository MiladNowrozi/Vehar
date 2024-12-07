// import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../../components/app/footer/Footer";
import Navbar from "../../components/app/navbar/Navbar";
import "../../fonts/fontAwesome/css/all.css";
import "./home.css";

// fs: stands for function scroll
// base pages in home page

const Home = () => {
	document.addEventListener("scroll", fsNavbar);
	function fsNavbar() {
		if (document.documentElement.scrollTop > 1) {
			document.querySelector(".defaultNavbar").classList.remove("Navbar");
			document.querySelector(".defaultNavbarLogo").classList.remove("NavbarLogo");
			document.querySelector(".DefaultCPM").classList.remove("ContentPageMenu");
			document.querySelector(".DefaultCPM").classList.add("ScrollPageMenu");
			document.querySelector(".defaultNavbar").classList.add("NACScroll");
			document.querySelector(".defNavbarMenuText").classList.add("scrollAddMenuText");
			document.querySelector(".defaultNavbarLogo").classList.add("NavbarLogoAddScroll");
			document.querySelector(".DefaultLogoGreen").classList.add("DisplayNone-AnimationGreen");
		}
		if (document.documentElement.scrollTop < 1) {
			document.querySelector(".defaultNavbar")?.classList.remove("NACScroll");
			document.querySelector(".defNavbarMenuText").classList.remove("scrollAddMenuText");
			document.querySelector(".defaultNavbarLogo").classList.remove("NavbarLogoAddScroll");
			document.querySelector(".DefaultCPM").classList.remove("ScrollPageMenu");
			document.querySelector(".DefaultCPM").classList.add("ContentPageMenu");
			document.querySelector(".defaultNavbar").classList.add("Navbar");
			document.querySelector(".defaultNavbarLogo").classList.add("NavbarLogo");
			document.querySelector(".defNavbarMenuText").classList.add("NavbarMenuText");
			document.querySelector(".DefaultLogoGreen").classList.remove("DisplayNone-AnimationGreen");
		}
	}
	return (
		<div className="bodyHome">
			<div className="defaultNavbar Navbar">
				<Navbar />
			</div>
			<div className="HeaderHome">
				<Outlet />
			</div>
			<div className="FooterHome">
				<Footer />
			</div>
		</div>
	);
};

export default Home;
