import { Link } from "react-router-dom";

import "./navbar.css";
export const NavbarAdmin = () => {
  return (
    <div className="admin-navbar-page">
      <div className="messages-admin">
        <i className="fas fa-comment-alt" aria-hidden="true"></i>
      </div>
      <div className="welcome-navbar-admin">
        <h1>به پنل ادمین خوش آمدید !</h1>
      </div>
      <div id="login-admin" className="login-admin">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        <div className="Show-LoginProfile-MainAdmin">
          <h3>سلام میلاد !</h3>
          <Link to={"/"}>
            امنیت <i className="fas fa-user-lock"></i>
          </Link>
          <Link to={"/"}>
            خروج <i className="fa fa-sign-out"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
