import { AnimationYellow } from "../../animations/Animation";
import "./footer.css";
// import Navbar from "../navbar/Navbar";

const Footer = () => {
  return (
    <div className="Container-footer">
      <div className="Content-Left-Menu">
        <div className="networcs">
          <i className="fab fa-telegram"></i>
          <i className="fab fa-instagram" style={{ fontSize: "22px" }}></i>
          <a href="#">
            <button href="#" className="eitaa-foter"></button>
          </a>
        </div>
      </div>
      <div className="Content-Center-Menu">
        <div className="Footer-Menu">
          <ul>
            <li>
              <a href="#">درباره ما</a>
              <span>|</span>
              <a href="#">تماس با ما</a>
              <span>|</span>
              <a href="#">مشارکت در خبرنگاری</a>
              <span>|</span>
              <a href="#">آرشیو</a>
            </li>
          </ul>
        </div>
        <div className="copy-right">
          <p>.تمام حقوق مادی و معنوی این سایت متعلق به وهار می باشد و استفاده از مطالب با ذکر منبع بلامانع است</p>
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
