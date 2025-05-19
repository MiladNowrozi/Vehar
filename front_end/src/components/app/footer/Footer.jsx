import { Link } from "react-router-dom";
import { AnimationYellow } from "../../../animations/Animation";
import "./footer.css";
import { useEffect } from "react";
// import Navbar from "../navbar/Navbar";

useEffect(() => {
	const script = document.createElement("script");
	script.src = "https://trustseal.e-rasaneh.ir/trustseal.js";
	script.async = true;

	script.onload = () => {
		if (window.eRasaneh_Trustseal) {
			window.eRasaneh_Trustseal(75564, true);
		}
	};

	document.body.appendChild(script);

	return () => {
		document.body.removeChild(script);
	};
}, []);

const Footer = () => {
	return (
		<div className="Container-footer">
			<div className="Content-Left-Menu">
				<div className="networcs">
					<Link to="https://telegram.me/vehar" className="fab fa-telegram"></Link>
					<Link to="http://instagram.com/vehar.ir" className="fab fa-instagram"></Link>
					<Link to="https://eitaa.com/vehar_ir" className="eitaa-foter"></Link>
				</div>
			</div>
			<div className="eRasaneh">
				<div id="div_eRasanehTrustseal_75564"></div>
			</div>
			<div className="Content-Center-Menu">
				<div className="Footer-Menu">
					<Link to="/about" className="Link-footer Link-footer-1">
						درباره ما
					</Link>
					<Link to="/contact-us" className="Link-footer Link-footer-2">
						تماس با ما
					</Link>
					<Link to="/participation" className="Link-footer Link-footer-3">
						مشارکت
					</Link>
					<Link to="/archive" className="Link-footer Link-footer-4">
						آرشیو
					</Link>
					<Link to="/" className="Link-footer Link-footer-5">
						صفحه اصلی
					</Link>
				</div>
				<div className="copy-right">
					<p>
						{" "}
						تمام حقوق مادی و معنوی این سایت متعلق به وهار می باشد و استفاده از مطالب با ذکر منبع
						بلامانع است .
					</p>
				</div>
			</div>
			<div className="Content-Right-Menu">
				<div onClick={() => (window.location.href = "/")} className="Footer-Logo"></div>
				<div className="animation-logo-yellow-footer">
					<AnimationYellow />
				</div>
			</div>
		</div>
	);
};

export default Footer;
