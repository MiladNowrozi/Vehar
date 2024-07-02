import "./navbar.css";
const NavbarAdmin = () => {
  function isClickMenuAdmin() {
    if (document.querySelector(".menu-admin").style.right === "-15%") {
      document.querySelector(".menu-admin").style.right = "0%";
      document.querySelector(".content-header-admin").style.width = "86%";
      document.querySelector(".deleted-2").style.backgroundColor = "unset";
      document.querySelector(".deleted-3").style.backgroundColor = "unset";
      document.querySelector(".content-header-admin").style.transition = "all .7s";
      document.querySelector(".menu-admin").style.transition = "all .7s";
    } else {
      document.querySelector(".menu-admin").style.right = "-15%";
      document.querySelector(".content-header-admin").style.transition = "all .8s";
      document.querySelector(".menu-admin").style.transition = "all .8s";
      document.querySelector(".content-header-admin").style.width = "100%";
      document.querySelector(".deleted-2").style.backgroundColor = "white";
      document.querySelector(".deleted-3").style.backgroundColor = "white";
    }
    document.querySelector(".deleted-1").classList.toggle("add-class-line-1");
    document.querySelector(".deleted-4").classList.toggle("add-class-line-4");
  }
  return (
    <>
      <section className="content-admin-menu-lines" onClick={isClickMenuAdmin}>
        <div className="line-admin-1 deleted-1"></div>
        <div className="line-admin-2 deleted-2"></div>
        <div className="line-admin-3 deleted-3"></div>
        <div className="line-admin-4 deleted-4"></div>
      </section>
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
    </>
  );
};

export default NavbarAdmin;
