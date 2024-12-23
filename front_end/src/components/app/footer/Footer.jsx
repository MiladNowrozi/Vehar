import { Link } from "react-router-dom";
import { AnimationYellow } from "../../../animations/Animation";
import "./footer.css";
// import Navbar from "../navbar/Navbar";

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
					<p>. تمام حقوق مادی و معنوی این سایت متعلق به وهار می باشد و استفاده از مطالب با ذکر منبع بلامانع است</p>
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
