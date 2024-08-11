import "./navbar.css";
const NavbarAdmin = () => {
  return (
    <div className="admin-navbar-page">
      <div className="welcome-navbar-admin">
        <h1>به پنل ادمین خوش آمدید !</h1>
      </div>
      <section className="content-admin-menu-ML">
        <div className="messages-admin">
          <i className="fa fa-bell" aria-hidden="true"></i>
        </div>
        <div className="login-admin">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
        </div>
      </section>
    </div>
  );
};

export default NavbarAdmin;
