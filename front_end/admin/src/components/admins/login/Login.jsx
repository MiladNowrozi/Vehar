import { Outlet } from "react-router-dom";
import { useState } from "react";

import "./login.css";

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    remember: "",
  });

  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(input);
  return (
    <div className="login-container">
      <div id="login-content" style={{ right: "35%" }} className="login-content">
        <p className="title-login">وارد شوید!</p>
        <form className="login-form" id="login-form" action="">
          <div className="login-input">
            <div className="username-login">
              <label htmlFor="username">نام کاربری:</label>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="نام کاربری"
                id="username"
                onChange={handelChange}
                required
              />
            </div>
            <div className="password-login">
              <label htmlFor="password">رمز عبور:</label>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                id="password"
                onChange={handelChange}
                required
              />
            </div>
          </div>
          <button type="submit">ارسال درخواست</button>
          <div className="other-info-login">
            <label>
              <input type="checkbox" name="remember" onChange={handelChange} />
              <p> ورود هوشمند</p>
            </label>
            <button type="button">فراموشی رمز عبور!</button>
            <button
              onClick={() => {
                document.getElementById("login-content").style.right = "-30%";
                document.getElementById("register-content").style.left = "35%";
              }}
              type="button"
            >
              ثبت نام
            </button>
          </div>
        </form>
      </div>
      <div id="register-content" style={{ left: "-35%" }} className="register-content">
        <p className="title-register">ثبت نام کنید!</p>
        <form className="register-form" id="register-form" action="">
          <div className="register-input">
            <div className="firstName-register">
              <label htmlFor="firstName">نام:</label>
              <input type="text" name="firstName" placeholder="نام ..." id="firstName" required />
            </div>
            <div className="lastName-register">
              <label htmlFor="lastName">نام خانوادگی:</label>
              <input
                type="text"
                name="lastName"
                placeholder="نام خانوادگی ..."
                id="lastName"
                required
              />
            </div>
            <div className="username-register">
              <label htmlFor="username">نام کاربری:</label>
              <i className="fas fa-user"></i>
              <input
                type="username"
                name="username"
                placeholder="نام کاربری ..."
                id="username"
                required
              />
            </div>
            <div className="password-register">
              <label htmlFor="password">رمز عبور:</label>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="رمز عبور ..."
                id="password"
                required
              />
            </div>
          </div>
          <button type="submit">ارسال درخواست</button>
          <div className="other-info-register">
            <label>
              <input type="checkbox" name="remember" />
              <p> ورود هوشمند</p>
            </label>
            <button
              onClick={() => {
                document.getElementById("login-content").style.right = "35%";
                document.getElementById("register-content").style.left = "-30%";
              }}
              type="button"
            >
              فراموشی رمز عبور!
            </button>
          </div>
        </form>
      </div>
      <Outlet />
    </div>
  );
};
