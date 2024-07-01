import "./admin.css";

function isClickMenuAdmin() {
  if (document.querySelector(".menu-admin").style.right === "-15%") {
    document.querySelector(".menu-admin").style.right = "0%";
    document.querySelector(".navbar-header-admin").style.width = "86%";
    document.querySelector(".deleted-2").style.backgroundColor = "unset";
    document.querySelector(".deleted-3").style.backgroundColor = "unset";
  } else {
    document.querySelector(".menu-admin").style.right = "-15%";
    document.querySelector(".navbar-header-admin").style.width = "100%";
    document.querySelector(".deleted-2").style.backgroundColor = "white";
    document.querySelector(".deleted-3").style.backgroundColor = "white";
  }
  document.querySelector(".deleted-1").classList.toggle("add-class-line-1");
  document.querySelector(".deleted-4").classList.toggle("add-class-line-4");
}

function clickHeaderAdmin() {
  if (document.querySelector(".menu-admin").style.right === "0%") {
    document.querySelector(".menu-admin").style.right = "-15%";
    document.querySelector(".deleted-2").style.backgroundColor = "white";
    document.querySelector(".deleted-3").style.backgroundColor = "white";
    document.querySelector(".navbar-header-admin").style.width = "100%";
  }
  document.querySelector(".deleted-1").classList.remove("add-class-line-1");
  document.querySelector(".deleted-4").classList.remove("add-class-line-4");
}

export const Admin = () => {
  return (
    <div className="body-admin">
      <div className="container-admin">
        <div className="navbar-admin">
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
        </div>
        <section className="menu-admin" style={{ right: "-15%" }}>
          <div className="navbar-menu-admin">
            <h1>دسترسی مالک</h1>
            <span className="×" onClick={isClickMenuAdmin}>
              ×
            </span>
          </div>
          <div className="header-menu-admin">
            <a href="#">
              <i className="fas fa-user-edit"></i>ویرایش پروفایل
            </a>
            <a href="#">
              <i className="fas fa-users"></i>کاربران
            </a>
            <a href="#">
              <i className="fas fa-user-plus"></i>اضافه کردن ادمین
            </a>
            <a href="#">
              <i className="fas fa-newspaper"></i>ایجاد خبر
            </a>
            <a href="#">
              <i className="fas fa-user-graduate"></i>ادمین ها
            </a>
            <a href="#">
              <i className="fas fa-envelope"></i>ایمیل ها
            </a>
          </div>
        </section>
        <div className="header-admin" onClick={clickHeaderAdmin}>
          <section className="content-header-admin">
            <div className="navbar-header-admin" style={{ width: "100%" }}>
              <div className="header-header-admin">
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
