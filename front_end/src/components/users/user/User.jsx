import { Header } from "../page/Header";
//
import "./user.css";
import { Navbar } from "../page/Navbar";
import Footer from "../../app/footer/Footer";
//
export const User = () => {
	return (
		<div className="container-user-panel">
			<div className="content-user-panel">
				<div className="include-navbar">
					<Navbar />
				</div>
				<div className="include-header">
					<Header />
				</div>
				<div className="include-footer">
					<Footer />
				</div>
			</div>
		</div>
	);
};
