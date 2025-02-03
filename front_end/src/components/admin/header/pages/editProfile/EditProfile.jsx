import "./editprofile.css";
import { useState } from "react";
export const EditProfile = () => {
	const [file, setFile] = useState(null);
	const handleClick = async () => {
		const formData = new FormData();
		formData.append("file", file);

		// await axiosInstance({
		//   method: "post",
		//   url: "/upload",
		//   data: formData,
		//   withCredentials: true,
		// });
	};

	return (
		<>
			<div className="admin-edit-page">
				<div className="admin-image-profile-edit">
					<img
						src={`${process.env.REACT_APP_BASE_URL}/get-images?name=/2024/09/%DB%B2%DB%B0%DB%B2%DB%B4%DB%B0%DB%B9%DB%B1%DB%B4_%DB%B2%DB%B2%DB%B1%DB%B7%DB%B1%DB%B1-scaled.jpg`}
						alt="admin"
					/>
					<form action="/">
						<label htmlFor="file">انتخاب تصویر</label>
						<input type="file" id="myfile" name="myfile" onChange={(e) => setFile(e.target.files[0])} />
					</form>
					<button onClick={handleClick}>send</button>
				</div>
				{/* <form action="/">
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
            <Link to={"/lord"}>انصراف</Link>
          </div>
        </form> */}
			</div>
		</>
	);
};
