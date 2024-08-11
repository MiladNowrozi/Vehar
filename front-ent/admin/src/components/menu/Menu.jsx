import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { AnimationYellow } from "../../animations/Animation";

const MenuAdmin = () => {
  return (
    <section className="menu-admin">
      <div className="navbar-menu-admin">
        <section className="animation">
          <span className="logo-site"></span>
          <span className="animate">
            <AnimationYellow />
          </span>
        </section>
        <h1>پایگاه خبری</h1>
      </div>
      <div className="header-menu-admin">
        <Link to={""}>
          <button className="btn-menu">
            <i className="fas fa-home"></i>صفحه اصلی
          </button>
        </Link>
        <Link to={"edit-profile"}>
          <button className="btn-menu">
            <i className="fas fa-user-edit"></i>ویرایش پروفایل
          </button>
        </Link>
        <Link to={"create-news"}>
          <button className="btn-menu">
            <i className="fas fa-newspaper"></i>ایجاد خبر
          </button>
        </Link>
        <Link to={"list-admins"}>
          <button className="btn-menu">
            <i className="fas fa-users"></i>ادمین ها
          </button>
        </Link>
        <Link to={"list-emails"}>
          <button>
            <i className="fas fa-envelope"></i>ایمیل ها
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MenuAdmin;
