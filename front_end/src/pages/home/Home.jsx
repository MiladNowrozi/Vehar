// import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../../components/app/footer/Footer";
import Navbar from "../../components/app/navbar/Navbar";
import "../../fonts/fontAwesome/css/all.css";
import "./home.css";

// fs: stands for function scroll
// base pages in home page

const Home = () => {
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
