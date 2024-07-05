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
    <div>
      <section className="menu-admin" style={{ right: "-15%" }}>
        <div className="navbar-menu-admin">
          <h1>دسترسی مالک</h1>
          <span className="×" onClick={isClickMenuAdmin}>
            ×
          </span>
        </div>
        <div className="header-menu-admin">
          <button
            onClick={() => {
              document.querySelector(".news-create-admin").style.display = "none";
              document.querySelector(".admin-edit-page").style.display = "block";
              document.querySelector(".edit-profile-admin").style.display = "none";
            }}
          >
            <i className="fas fa-user-edit"></i>ویرایش پروفایل
          </button>
          <button
            onClick={() => {
              document.querySelector(".news-create-admin").style.display = "flex";
              document.querySelector(".admin-edit-page").style.display = "none";
              document.querySelector(".edit-profile-admin").style.display = "none";
            }}
          >
            <i className="fas fa-newspaper"></i>ایجاد خبر
          </button>
          <button
            onClick={() => {
              console.log("3");
            }}
          >
            <i className="fas fa-users"></i>کاربران
          </button>
          <button
            onClick={() => {
              console.log("4");
            }}
          >
            <i className="fas fa-user-plus"></i>اضافه کردن ادمین
          </button>
          <button
            onClick={() => {
              console.log("5");
            }}
          >
            <i className="fas fa-users"></i>ادمین ها
          </button>
          <button
            onClick={() => {
              console.log("6");
            }}
          >
            <i className="fas fa-envelope"></i>ایمیل ها
          </button>
        </div>
      </section>
    </div>
  );
};

export default MenuAdmin;
