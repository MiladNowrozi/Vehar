import "./editprofile.css";
const EditProfile = () => {
  return (
    <>
      <div className="edit-profile-admin">
        <div className="content-profile-admin">
          <button
            onClick={() => {
              document.querySelector(".admin-edit-page").classList.remove("admin-edit-page-close");
              document.querySelector(".admin-edit-page").classList.toggle("admin-edit-page-showed");
            }}
          >
            ویرایش پروفایل
          </button>
          <div className="image-admin">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/100px-User_icon_2.svg.png"
              alt="admin"
            />
          </div>
          <div className="admin-name">
            <h1>میلاد نوروزی</h1>
          </div>
          <div className="admin-title">
            <h2>برنامه نویس فرانت و بک اند</h2>
          </div>
          <div className="admin-Bio">
            <h3>
              از سال 1400 به برنامه نویسی تحت وب گرایش پیدا کردم و در بدو این حرفه، با وردپرس آشنا
              شدم؛ اما در اندک زمانی بعد، به سمت کد نویسی اومدم و بعد از حدوداً 3 سال توانستم به درک
              قابل قبولی از html css, js, react, nodejs, mysql برسم و تا الآن در این حوزه مشغول
            </h3>
          </div>
        </div>
        <div className="admin-edit-page">
          <form className="input-news-admin" action="/">
            <label>عنوان خبر :</label>
            <input
              type="text"
              name="lname"
              autoComplete="off"
              placeholder="جهان بینی خبرنگاران ..."
            ></input>
            <label>توضیح کوتاه :</label>
            <input
              type="text"
              name="lname"
              autoComplete="off"
              placeholder="خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
            ></input>
            <label>متن خبر :</label>
            <textarea name="subject" placeholder="تایپ کردن ..."></textarea>
            <div className="row">
              <input type="submit" value="ثبت" />
            </div>
          </form>
          <button
            onClick={() => {
              document.querySelector(".admin-edit-page").classList.toggle("admin-edit-page-close");
              document.querySelector(".admin-edit-page").classList.remove("admin-edit-page-showed");
            }}
          >
            انصراف
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
