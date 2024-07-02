import "./menu.css";

const MenuAdmin = () => {
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
      <section className="menu-admin" style={{ right: "-15%" }}>
        <div className="navbar-menu-admin">
          <h1>دسترسی مالک</h1>
          <span className="×" onClick={isClickMenuAdmin}>
            ×
          </span>
        </div>
        <div className="header-menu-admin">
          <button>
            <i className="fas fa-user-edit"></i>ویرایش پروفایل
          </button>
          <button>
            <i className="fas fa-newspaper"></i>ایجاد خبر
          </button>
          <button>
            <i className="fas fa-users"></i>کاربران
          </button>
          <button>
            <i className="fas fa-user-plus"></i>اضافه کردن ادمین
          </button>
          <button>
            <i className="fas fa-user-graduate"></i>ادمین ها
          </button>
          <button>
            <i className="fas fa-envelope"></i>ایمیل ها
          </button>
        </div>
      </section>
    </>
  );
};

export default MenuAdmin;
