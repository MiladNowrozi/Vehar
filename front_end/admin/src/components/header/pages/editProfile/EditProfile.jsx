import { Link } from "react-router-dom";
import "./editprofile.css";
export const EditProfile = () => {
  return (
    <>
      <div className="admin-edit-page">
        <div className="admin-image-profile-edit">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/110px-User_icon_2.svg.png"
            alt="admin"
          />
          <form action="/">
            <label htmlFor="file">انتخاب تصویر</label>
            <input type="file" id="myfile" name="myfile" />
          </form>
        </div>
        <form action="/">
          <div className="admin-name-edit">
            <label>نام :</label>
            <input
              type="text"
              name="lname"
              autoComplete="off"
              placeholder="میلاد نوروزی ..."
            ></input>
          </div>
          <div className="admin-title-edit">
            <label>عنوان بیوگرافی :</label>
            <input
              type="text"
              name="lname"
              autoComplete="off"
              placeholder="برنامه نویس فول استک ..."
            ></input>
          </div>
          <div className="admin-bio-edit">
            <label>بیوگرافی :</label>
            <textarea
              name="subject"
              placeholder="میلاد نوروزی برنامه نویس فرانت و بک، حدودا سه سالی هست در این زمینه مشغول هستم ..."
            ></textarea>
          </div>
          <div className="buttons-edit-profile">
            <input type="submit" value="ذخیره" />
            <Link to={"/main-admin"}>انصراف</Link>
          </div>
        </form>
      </div>
    </>
  );
};
