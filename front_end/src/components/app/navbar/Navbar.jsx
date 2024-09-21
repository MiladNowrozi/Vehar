import { useContext } from "react";
import AnimationGreen, { AnimationYellow } from "../../../animations/Animation";
import { MenuHamburger } from "../header/pageMenu/PageMenu";
import { AuthContext } from "../../../context/authContext";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const { CurrentUser, logout } = useContext(AuthContext);
  return (
    <div className="NavbarContainer">
      <div className="NavbarMenuText defNavbarMenuText">
        <div
          onClick={() => (window.location.href = "/")}
          className="Logo NavbarLogo defaultNavbarLogo"
        >
          <div className="DefaultLogoGreen animation-logo-green">
            <AnimationGreen />
          </div>
          <div className="DefaultLogoYellow animation-logo-yellow">
            <AnimationYellow />
          </div>
        </div>
        <ul>
          <li>
            <Link to="/contact">ارتباط با ما</Link>
            <Link to="/about">درباره ما</Link>
            <Link to="/sport">ورزشی</Link>
            <Link to="/social">اجتماعی</Link>
            <Link to="/politic">سیاسی</Link>
            <Link to="/local">بومی</Link>
            <Link to="/">صفحه اصلی</Link>
          </li>
        </ul>
      </div>
      <div className="formContent">
        <div className="SloganVehar">
          <p>
            <span style={{ color: "red" }}>سیاسی هستیم</span> جناحی نیستیم
          </p>
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
          <input type="search" placeholder="... جستجو" name="search" autoComplete="off" />
        </form>
        {!CurrentUser ? (
          <div className="login-icon">
            <Link to={"/login-register"} className="Link">
              <i className="fa fa-sign-in"></i>
            </Link>
          </div>
        ) : (
          <div className="logout-icon">
            <i className="fas fa-user-check"></i>
            <div className="content-logout">
              <span className="img-user">
                {CurrentUser.img === null ? (
                  <i className="fas fa-user-circle"></i>
                ) : (
                  <img className="img" src={CurrentUser.img} alt="img-user" />
                )}
              </span>
              <span className="firstName-user">
                {CurrentUser.firstName + " " + CurrentUser.lastName}
              </span>
              <button type="button" onClick={logout} className="btn-logout">
                <i className="fa fa-sign-out"></i>خروج
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
