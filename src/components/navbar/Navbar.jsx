import { MenuHamburger } from "../header/pageMenu/PageMenu";
import AnimationGreen, { AnimationYellow } from "../../animations/Animation";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="NavbarContainer">
      <div className="NavbarMenuText defNavbarMenuText">
        <div onClick={() => (window.location.href = "/")} className="Logo NavbarLogo defaultNavbarLogo">
          <div className="DefaultLogoGreen animation-logo-green">
            <AnimationGreen />
          </div>
          <div className="DefaultLogoYellow animation-logo-yellow">
            <AnimationYellow />
          </div>
        </div>
        <ul>
          <li>
            <a href="/">ورزشی</a>
            <a href="/">اجتماعی</a>
            <a href="/">سیاسی</a>
            <a href="/">اخبار جدید</a>
            <a href="/">اخبار بومی</a>
            <a href="/">صفحه اصلی</a>
          </li>
        </ul>
      </div>
      <div className="formContent">
        <div className="SloganVehar">
          <h1>
            <span style={{ color: "red" }}>سیاسی هستیم</span> جناحی نیستیم
          </h1>
        </div>
        <MenuHamburger />
        <form action="#">
          <button className="searchSvg" type="submit">
            {
              <span>
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            }
          </button>
          <input type="text" placeholder=".... جستجو" name="search" autoComplete="off" />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
