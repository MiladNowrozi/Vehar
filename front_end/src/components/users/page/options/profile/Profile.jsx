import React, { useContext, useEffect } from "react";
import "./profile.css";
import { useState } from "react";
import { AxiosInstance } from "../../../../../axiosInstance";
import { AuthContext } from "../../../../../context/authContext";
import moment from "moment";
const fa0 = " نام خانوادگی : ";
const fa1 = "نام : ";
const fa2 = "ایمیل : ";
const fa5 = "انتخاب تصویر";
const fa6 = "لغو";
const fa7 = "ویرایش";
const fa8 = "ایمیل باید به gmail.com@ ختم شود !";
const fa9 = "رمز عبور : ";
const fa10 = "نام کاربری : ";
const fa12 = "زمان ساخت حساب : ";
const fa13 = "آخرین بروزرسانی : ";
const fa14 = "رمز عبور جدید ...";
const fa15 = "تایید شده";
const fa16 = "تایید نشده";
const i1 = "نام کاربری باید حداقل 8 کاراکتر باشد!";
const i2 = "نام کاربری باید از کاراکتر های انگلیسی تشکیل شود!";
const i3 = "نام کاربری باید حداقل شامل بک حرف کوچک باشد!";
const i4 = "نام کاربری باید حداقل شامل یک حرف بزرگ باشد!";
const i5 = "نام کاربری باید حداقل شامل یک عدد باشد!";
const i6 = "نام کاربری باید حداقل شامل یکی از نمادهای @#$%& باشد!";

export default function Profile() {
	const [FirstNameUser, SetFirstNameUser] = useState("");
	const [LastNameUser, SetLastNameUser] = useState("");
	const [EmailUser, SetEmailUser] = useState("");
	const [UserName, SetUserName] = useState("");
	const [PasswordUser, SetPasswordUser] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [success, setSuccess] = useState(false);
	const [Reg, SetReg] = useState({
		status: true,
		content: "",
	});
	const [ActionEditPart, setActionEditPart] = useState(false);
	const [DataUser, setDataUser] = useState([]);
	const { CurrentUser } = useContext(AuthContext);
	//
	useEffect(() => {
		const fetchData = async () => {
			await AxiosInstance({
				method: "get",
				url: `user/get?id=${CurrentUser?.Info.Id}`,
				withCredentials: true,
			})
				.then((success) => {
					setDataUser(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		fetchData();
	}, []);

	const handleFileChange = async (event) => {
		const file = event.target?.files[0];
		const previewUrl = URL.createObjectURL(file);
		setSelectedImage(file);
		setImagePreview(previewUrl);
	};
	//
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (selectedImage) {
			const formData = new FormData();
			formData.append("file", selectedImage);
			await AxiosInstance.post("/upload/user", formData)
				.then((success) => {
					DataUser.fileUsers[0].FilePath = success.data.FilePath;
					setImagePreview(null);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		if (Reg.status && /^.+@gmail\.com+[\W]?$/.test(EmailUser ? EmailUser : DataUser.emailUser?.EmailUser)) {
			await AxiosInstance.post(
				`/user/edit?firstname=${FirstNameUser}&lastname=${LastNameUser}&username=${UserName}&password=${PasswordUser}&email=${EmailUser}`
			)
				.then((success) => {
					setDataUser(success.data.body);
					setImagePreview(null);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			if (!Reg.status) {
				document.getElementById("validation-username").focus();
			} else {
				document.getElementById("input-user-edit-panel").focus();
			}
		}
	};
	const RegularUser = (v) => {
		[
			{ i: i1, reg: /.{8,}/.test(v) },
			{ i: i2, reg: /^[\w@#$%&]*$/.test(v) },
			{ i: i3, reg: /[a-z]/.test(v) },
			{ i: i4, reg: /[A-Z]/.test(v) },
			{ i: i5, reg: /[0-9]/.test(v) },
			{ i: i6, reg: /[@#$%&]/.test(v) },
		].filter((e) => (e.reg === false ? SetReg({ ...Reg, status: false, content: e.i }) : e)).length === 6 &&
			SetReg({ ...Reg, status: true, content: "" });
	};

	return (
		<div className="user-container">
			{!ActionEditPart ? (
				<div className="user-content-container">
					<h5>پروفایل</h5>
					<div className="user-profile-content">
						<div className="user-image-profile">{<img src={DataUser.Default_Image} alt="igm" />}</div>
						<div className="user-other-profile">
							<div className="user-name-input">
								{fa1}
								{DataUser.User_FirstName + " " + DataUser.User_LastName}
							</div>
							<div className="user-email-input">
								{fa2}
								{success ? <p>{success}</p> : DataUser.emailUser?.EmailUser}
								{!success && (
									<button
										disabled={DataUser.Verify_Email}
										onClick={async () =>
											await AxiosInstance.get(`auth/verify-email?email=${DataUser.emailUser?.EmailUser}&status=false`)
												.then((s) => setSuccess(s.data.message))
												.catch((e) => setSuccess(e.data.message))
										}
									>
										{DataUser.Verify_Email ? <p style={{ color: "green" }}>{fa15}</p> : <p style={{ color: "red" }}>{fa16}</p>}
									</button>
								)}
							</div>
							<div className="user-name-other">
								{fa10}
								{DataUser.User_UserName}
							</div>
							<div className="user-createAt-other">
								{fa12}
								{moment(DataUser.createdAt).fromNow()}
							</div>
							<div className="user-updatedAt-other">
								{fa13}
								{moment(DataUser.updatedAt).fromNow()}
							</div>
						</div>
						<button className="btn-going-to-edit-user" onClick={() => setActionEditPart(true)}>
							{fa7}
						</button>
					</div>
				</div>
			) : (
				<div className="user-edit-content-container">
					<h5>پروفایل</h5>
					<div className="user-edit-profile-content">
						<div className="user-edit-image-profile">
							<label htmlFor="ImgProfileUser">
								{<img src={imagePreview ? imagePreview : DataUser.Default_Image} alt="igm" />}
								<p>{fa5}</p>
							</label>
							<input style={{ display: "none" }} onChange={handleFileChange} type="file" id="ImgProfileUser" accept="image/*,.jpg,.jpeg,.png" />
						</div>
						<div className="user-edit-inputs-profile">
							<div className="user-edit-name-input">
								{fa1}
								<input type="text" value={FirstNameUser} placeholder={DataUser.User_FirstName} onChange={(e) => SetFirstNameUser(e.target.value)} />
							</div>
							<div className="user-edit-name-input">
								{fa0}
								<input type="text" value={LastNameUser} placeholder={DataUser.User_LastName} onChange={(e) => SetLastNameUser(e.target.value)} />
							</div>
							<div className="user-edit-email-input">
								{fa2}
								<input
									type="email"
									id="input-user-edit-panel"
									value={EmailUser}
									placeholder={DataUser.emailUser?.EmailUser}
									onChange={(e) => SetEmailUser(e.target.value)}
								/>
								{!/^.+@gmail\.com+[\W]?$/.test(!EmailUser ? DataUser.emailUser?.EmailUser : EmailUser) && <p>{fa8}</p>}
							</div>
						</div>
						<div className="user-edit-other-profile">
							<div className="user-edit-name-other">
								<label htmlFor="validation-username">{fa10}</label>
								<input
									type="username"
									value={UserName}
									placeholder={DataUser.User_UserName}
									onChange={(e) => {
										SetUserName(e.target.value);
										RegularUser(e.target.value.length > 0 ? e.target.value : DataUser.User_UserName);
									}}
									name="username"
									id="validation-username"
								/>
								{!Reg.status && (
									<p id="warning-username" style={{ color: "red" }}>
										{Reg.content}
									</p>
								)}
							</div>
							<div className="user-edit-password-other">
								{fa9}
								<input
									type="password"
									placeholder={fa14}
									value={PasswordUser}
									onChange={(e) => SetPasswordUser(e.target.value)}
									name="username"
									id="username"
								/>
							</div>
							<div className="btn-action-edit">
								<button
									onClick={() => {
										setActionEditPart(false);
										setImagePreview(false);
										SetFirstNameUser("");
										SetUserName("");
										SetEmailUser("");
										SetPasswordUser("");
										SetReg({ ...Reg, status: false, content: "" });
									}}
								>
									{fa6}
								</button>
								<button onClick={handleSubmit}>{fa7}</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
